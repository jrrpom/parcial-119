import { createContext, useContext, useEffect, useState } from 'react'

const KEY = '119-reportes'
const Ctx = createContext(null)
export const useReportes = () => useContext(Ctx)

const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] } }

// Estado global: la lista de reportes vive SOLO aqui y se guarda en localStorage.
export function ReportesProvider({ children }) {
  const [reportes, setReportes] = useState(leer)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(reportes)) }
    catch { alert('Memoria del navegador llena: borra reportes viejos (localStorage.clear()).') }
  }, [reportes])

  // Extra: sincroniza pestañas (ciudadano y operador) con el evento storage
  useEffect(() => {
    const f = (e) => e.key === KEY && setReportes(leer())
    window.addEventListener('storage', f)
    return () => window.removeEventListener('storage', f)
  }, [])

  const agregar = (datos) => {
    const id = Date.now()
    const r = { ...datos, id, radicado: `119-${String(id).slice(-6)}`, hora: new Date().toISOString(), estado: 'Recibido', unidad: null }
    setReportes((prev) => [r, ...prev])
    return id
  }
  const actualizar = (id, cambios) =>
    setReportes((prev) => prev.map((r) => (r.id === id ? { ...r, ...cambios } : r)))

  // Borrar un reporte o todos (solo para limpiar pruebas)
  const eliminar = (id) => setReportes((prev) => prev.filter((r) => r.id !== id))
  const limpiarTodo = () => setReportes([])

  return <Ctx.Provider value={{ reportes, agregar, actualizar, eliminar, limpiarTodo }}>{children}</Ctx.Provider>
}