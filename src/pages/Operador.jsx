import { useState } from 'react'
import { Link } from 'react-router-dom'
import MapaOperador from '../mapa/MapaOperador.jsx'
import ListaReportes from '../components/ListaReportes.jsx'
import DetalleReporte from '../components/DetalleReporte.jsx'
import { useReportes } from '../context/ReportesContext.jsx'
import { GRUPOS } from '../data/grupos.js'
import { generarReportes } from '../utils/simulacion.js'
import { zonasCalientes } from '../utils/agrupar.js'

const ESTADOS = ['Recibido', 'Validado', 'Unidad despachada', 'Cerrado', 'Descartado']

export default function Operador() {
  const { reportes, agregarMuchos, actualizar, eliminar, limpiarTodo } = useReportes()
  const [seleccionadoId, setSeleccionadoId] = useState(null)
  const [fg, setFg] = useState('todos')
  const [fe, setFe] = useState('todos')

  const visibles = reportes.filter((r) => (fg === 'todos' || r.grupo === Number(fg)) && (fe === 'todos' || r.estado === fe))
  const zonas = zonasCalientes(visibles)
  const r = reportes.find((x) => x.id === seleccionadoId)

  return (
    <div className="operador">
      <div className="operador__mapa">
        <MapaOperador reportes={visibles} zonas={zonas} seleccionadoId={seleccionadoId} onSeleccionar={setSeleccionadoId} />
      </div>
      <aside className="operador__panel">
        <h2>Radio operador</h2>
        <div className="filtros">
          <select value={fg} onChange={(e) => setFg(e.target.value)}>
            <option value="todos">Todos los grupos</option>
            {GRUPOS.map((g) => <option key={g.codigo} value={g.codigo}>{g.codigo} · {g.nombre}</option>)}
          </select>
          <select value={fe} onChange={(e) => setFe(e.target.value)}>
            <option value="todos">Todos los estados</option>
            {ESTADOS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <p className="vacio">Mostrando {visibles.length} de {reportes.length}</p>
        {zonas.length > 0 && <p className="alerta">⚠ {zonas.length} zona(s) con 3 o más reportes cercanos (círculos rojos en el mapa)</p>}
        {reportes.length === 0 && <p className="vacio">Sin reportes. Crea uno en <Link to="/reportar">/reportar</Link>.</p>}
        <ListaReportes reportes={visibles} seleccionadoId={seleccionadoId} onSeleccionar={setSeleccionadoId} />

        {r && (
          <DetalleReporte
            key={r.id}
            reporte={r}
            onActualizar={(cambios) => actualizar(r.id, cambios)}
            onEliminar={() => { eliminar(r.id); setSeleccionadoId(null) }}
          />
        )}

        <div className="acciones">
          <button className="btn" onClick={() => agregarMuchos(generarReportes(50))}>Simular 50 reportes</button>
          {reportes.length > 0 && (
            <button className="btn btn--claro" onClick={() => confirm('¿Borrar TODOS los reportes?') && limpiarTodo()}>Borrar todos</button>
          )}
        </div>
        <Link to="/" className="volver">Volver a la landing</Link>
      </aside>
    </div>
  )
}
