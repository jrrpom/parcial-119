# Parcial Línea 119 · Bomberos Cali — Código base

Proyecto inicial con React + Vite + React Router + Leaflet (mapa real) + React Three Fiber.

## Cómo correrlo

```bash
npm install
npm run dev
```

- `http://localhost:5173/operador` → mapa real de Cali con 9 reportes de prueba (zoom, arrastrar, cambiar a modo oscuro con el botón de capas).
- `http://localhost:5173/` → landing con una escena 3D de ejemplo.

El mapa usa **OpenStreetMap** a través de **Leaflet**: no necesita API key ni tarjeta de crédito, solo internet.

## Qué viene hecho

| Archivo | Qué hace |
| --- | --- |
| `src/App.jsx` | Las tres rutas: `/`, `/reportar`, `/operador` |
| `src/data/grupos.js` | Grupos de emergencia 100–900 con su color y `colorDeGrupo(codigo)` |
| `src/data/barrios.js` | 19 barrios de Cali con coordenadas aproximadas |
| `src/mapa/MapaOperador.jsx` | Mapa real (calles u oscuro), un pin por reporte, popup, vuelo al reporte seleccionado y leyenda con conteo por grupo |
| `src/mapa/iconos.js` | `crearIcono(color, opciones)`: pin de color hecho con HTML/CSS |
| `src/mapa/mapa.css` | Estilos del pin, la leyenda y la animación de pulso (ya escrita) |
| `src/three/EscenaLanding.jsx` | Escena R3F mínima (una sirena que gira) para comprobar que React Three Fiber funciona |
| `src/pages/Operador.jsx` | Ejemplo de uso: mapa + lista; al hacer clic en la lista el mapa vuela al reporte |

## Qué debe hacer el equipo (busquen los `TODO` en el código)

1. **Estado global:** Context con la lista de reportes, guardado en `localStorage` y usado en las tres pantallas.
2. **Conectar el mapa:** en `Operador.jsx`, reemplazar `REPORTES_DEMO` por los reportes reales del ciudadano.
3. **Pines según el estado:** aplicar la clase `pin--pulso` a los reportes Recibido, y crear `pin--apagado` para Cerrado / Descartado.
4. **Popup:** nombre, qué ve y estado.
5. **Escena 3D de la landing:** reemplazar la sirena de ejemplo por su propia escena con React Three Fiber.
6. **Pantallas:** Landing, Reportar y el panel del operador (lista, detalle, llamar/validar y despacho).

Estados del reporte: `Recibido` → `Validado` → `Unidad despachada` → `Cerrado` (o `Descartado`).

Extras opcionales: ver la sección de extras del enunciado (emergencia masiva, mini mapa en `/reportar`, etc.).

---
## Equipo
- Integrante 1 (código)
- Integrante 2 (código)

Sitio desplegado: _pegar enlace de Vercel/Netlify_

## Qué se implementó
- `src/context/ReportesContext.jsx`: estado global + localStorage + sincronización entre pestañas (evento `storage`).
- `/reportar`: formulario controlado con validación, fotos (máx. 3) y confirmación con estado en vivo.
- `/`: landing con escena 3D propia (extintor, `useFrame`, hover y clic), botones y tarjetas de grupos.
- `/operador`: lista, detalle, Llamar, Validar/Descartar (con corrección de grupo), Despachar (solo si está Validado) y Cerrar.
- Mapa: reportes reales, `pin--pulso` en Recibido, `pin--apagado` en Cerrado/Descartado, popup completo.

## Preguntas de Bomberos (completar con el equipo)
1. Mapa con ubicación exacta: ...
2. Respuesta automática: ...
3. Emergencia masiva: ...
4. Videollamada: ...
5. Varias fotos/videos: ...

## Pregunta de diseño
Con foto/video se pueden omitir: ... (justificar al menos dos)
