import { useState } from 'react'
import { Link } from 'react-router-dom'
import MapaOperador from '../mapa/MapaOperador.jsx'
import ListaReportes from '../components/ListaReportes.jsx'
import DetalleReporte from '../components/DetalleReporte.jsx'
import { useReportes } from '../context/ReportesContext.jsx'

export default function Operador() {
  const { reportes, actualizar, eliminar, limpiarTodo } = useReportes()
  const [seleccionadoId, setSeleccionadoId] = useState(null)
  const r = reportes.find((x) => x.id === seleccionadoId)

  return (
    <div className="operador">
      <div className="operador__mapa">
        <MapaOperador reportes={reportes} seleccionadoId={seleccionadoId} onSeleccionar={setSeleccionadoId} />
      </div>
      <aside className="operador__panel">
        <h2>Radio operador</h2>
        {reportes.length === 0 && <p className="vacio">Sin reportes. Crea uno en <Link to="/reportar">/reportar</Link>.</p>}
        <ListaReportes reportes={reportes} seleccionadoId={seleccionadoId} onSeleccionar={setSeleccionadoId} />

        {r && (
          <DetalleReporte
            key={r.id}
            reporte={r}
            onActualizar={(cambios) => actualizar(r.id, cambios)}
            onEliminar={() => { eliminar(r.id); setSeleccionadoId(null) }}
          />
        )}

        {reportes.length > 0 && (
          <button className="btn btn--claro" style={{ marginTop: 12 }}
            onClick={() => confirm('¿Borrar TODOS los reportes?') && limpiarTodo()}>
            Borrar todos
          </button>
        )}
        <Link to="/" className="volver">Volver a la landing</Link>
      </aside>
    </div>
  )
}
