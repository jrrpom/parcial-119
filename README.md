# Línea 119 · Bomberos Cali — Prototipo web

Prototipo web de un canal digital de reportes de emergencia para el Cuerpo de Bomberos Voluntarios de Cali. Parcial final de Desarrollo Web (Ingeniería Multimedia, Universidad de San Buenaventura, 2026-2).

**Sitio desplegado:** [Línea 119 · Bomberos Cali](https://parcial-119.vercel.app/)

## Integrante

- Jose Roberto Ruiz — código 3000007216 — GitHub: [@jrrpom](https://github.com/jrrpom)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

- `http://localhost:5173/` → landing con escena 3D
- `http://localhost:5173/reportar` → reporte del ciudadano
- `http://localhost:5173/operador` → tablero del radio operador

Para probar el flujo: abrir `/reportar`, enviar un reporte y luego abrir `/operador` en la misma pestaña. El estado se guarda en `localStorage`; los reportes de prueba se pueden borrar desde el tablero del operador.

## Stack

React + Vite, React Router, react-leaflet (OpenStreetMap), @react-three/fiber y @react-three/drei, Context API + localStorage. Sin backend.

## Estructura

- `src/context/ReportesContext.jsx`: estado global de reportes (Context + localStorage + sincronización entre pestañas con el evento `storage`).
- `src/pages/`: Landing, Reportar y Operador.
- `src/components/`: Campo, SubidorFotos, ConfirmacionReporte, TarjetaGrupo, ListaReportes, DetalleReporte.
- `src/mapa/`: mapa del operador (pines según estado y popup).
- `src/three/EscenaLanding.jsx`: escena 3D de la landing (extintor con `useFrame` e interacción con el mouse).
- `src/utils/`: validación del formulario y compresión de imágenes.

## Extras implementados

- Sincronización de pestañas abiertas (ciudadano y operador) con el evento `storage`.

## Respuestas a las 5 preguntas de Bomberos

**1. ¿Puede llegarle al radio operador un mapa con la ubicación exacta a partir de las coordenadas del ciudadano?**
*Qué se hizo:* el ciudadano elige su barrio y el reporte aparece como un pin en un mapa real de Cali (Leaflet + OpenStreetMap). El detalle incluye un enlace «Ver en Google Maps» con las coordenadas. *Qué faltaría:* hoy la coordenada es la del centro del barrio, no la exacta. Para producción se usaría la geolocalización del navegador o un mini mapa para que el ciudadano marque el punto exacto.

**2. ¿Puede el ciudadano recibir una respuesta automática para saber que su reporte fue recibido?**
*Qué se hizo:* al enviar, aparece una pantalla de confirmación con número de radicado, hora y estado, que cambia cuando el operador valida, despacha o cierra el caso. *Qué faltaría:* notificaciones fuera de la página (SMS, WhatsApp o correo) y un backend que actualice el estado en tiempo real entre dispositivos distintos.

**3. ¿Qué pasa si hay una emergencia de gran magnitud y llegan reportes masivos?**
*Qué se hizo:* el tablero muestra todos los reportes en una lista y en el mapa; los nuevos pulsan y la leyenda cuenta los reportes por grupo. *Qué faltaría:* con localStorage solo caben unas pocas decenas de reportes. Se necesitaría base de datos, filtros por grupo y estado, agrupar reportes cercanos para detectar una misma emergencia y priorizar casos.

**4. ¿Puede el radio operador, si lo decide, hacer una videollamada al ciudadano?**
*Qué se hizo:* está fuera del alcance del parcial. El botón «Llamar» abre la aplicación de teléfono con el número del ciudadano mediante un enlace `tel:`. *Qué faltaría:* integrar videollamada web (WebRTC o un servicio como Jitsi, Daily o Twilio), donde el operador envíe un enlace al ciudadano, junto con autenticación para el operador.

**5. ¿Se pueden enviar varias fotos o videos, con recomendaciones de cómo tomarlos?**
*Qué se hizo:* el ciudadano puede adjuntar hasta 3 fotos con miniaturas; se comprimen y se guardan en el navegador. *Qué faltaría:* soporte de video, una ventana con recomendaciones para tomar buenas imágenes (por ejemplo, desde lejos y sin ponerse en riesgo) y almacenamiento en un servidor.

## Pregunta de diseño: ¿qué preguntas del protocolo se pueden omitir con foto, video o videollamada?

1. **«¿Cuál es su emergencia?» / ¿qué ve?:** una foto o video de un incendio, un accidente o una inundación muestra el tipo de emergencia y su magnitud sin necesidad de que la persona lo describa, lo que acelera la clasificación del grupo.
2. **«¿Dónde es su emergencia?» (punto de referencia y nombre del edificio):** una foto de la fachada y del entorno, junto con la ubicación en el mapa, permite al operador identificar el sitio sin preguntar referencias; en una videollamada puede ver el lugar directamente.

No se pueden omitir el nombre ni el teléfono, porque el operador los necesita para contactar y validar el reporte.

## Créditos del modelo 3D

Modelo «Fire Extinguisher» por [bananacake](https://free3d.com/es/user/bananacake), tomado de [Free3D](https://free3d.com/es/modelo-3d/fire-extinguisher-785436.html). Licencia de uso personal de Free3D; se usa únicamente con fines académicos y sin fines comerciales. Los materiales se reasignaron por código en `src/three/EscenaLanding.jsx`.

## Datos de prueba

Todos los datos de prueba son ficticios.
