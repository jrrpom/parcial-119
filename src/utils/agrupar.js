// Agrupa los reportes ACTIVOS por cuadrícula (~450 m) y devuelve las zonas con `min` o más reportes cercanos.
export function zonasCalientes(reportes, min = 3, celda = 0.004) {
  const g = {}
  reportes
    .filter((r) => !['Cerrado', 'Descartado'].includes(r.estado))
    .forEach((r) => {
      const k = `${Math.round(r.lat / celda)}_${Math.round(r.lng / celda)}`
      ;(g[k] ??= []).push(r)
    })
  return Object.values(g)
    .filter((a) => a.length >= min)
    .map((a) => ({ n: a.length, lat: a.reduce((s, r) => s + r.lat, 0) / a.length, lng: a.reduce((s, r) => s + r.lng, 0) / a.length }))
}
