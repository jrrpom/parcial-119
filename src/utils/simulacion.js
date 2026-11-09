import { BARRIOS } from '../data/barrios.js'

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const QUE_VE = ['Humo visible en el segundo piso', 'Persona atrapada en un vehículo', 'Olor fuerte a gas', 'Árbol caído sobre la vía', 'Inundación en la calle', 'Llamas en un lote']
const ESTADOS = ['Recibido', 'Recibido', 'Recibido', 'Validado', 'Unidad despachada', 'Cerrado', 'Descartado']
const GRUPOS_COD = [100, 100, 200, 300, 300, 400, 500, 800, 900]

// Genera n reportes ficticios repartidos por Cali (para probar una emergencia masiva).
export function generarReportes(n = 50) {
  const base = Date.now()
  return Array.from({ length: n }, (_, i) => {
    const b = pick(BARRIOS), id = base + i, estado = pick(ESTADOS)
    return {
      id, radicado: `119-${String(id).slice(-6)}`, hora: new Date(id - Math.random() * 3600000).toISOString(),
      estado, unidad: ['Unidad despachada', 'Cerrado'].includes(estado) ? pick(['Máquina', 'Rescate', 'Ambulancia', 'HazMat']) : null,
      nombres: pick(['Ana', 'Luis', 'Marta', 'Pedro']), apellidos: pick(['Prueba', 'Ejemplo', 'Demo']), telefono: '3000000000',
      grupo: pick(GRUPOS_COD), queVe: pick(QUE_VE), direccion: 'Calle 0 # 0-00', barrio: b.nombre, referencia: 'Simulado', edificio: '', noAplica: true,
      lat: b.lat + (Math.random() - 0.5) * 0.006, lng: b.lng + (Math.random() - 0.5) * 0.006, medios: [],
    }
  })
}
