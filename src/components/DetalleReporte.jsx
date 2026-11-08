import { useState } from 'react'
import { GRUPOS } from '../data/grupos.js'

const UNIDADES = ['Máquina', 'Rescate', 'Ambulancia', 'HazMat']

// Detalle de un reporte + acciones del operador (llamar, validar, despachar, cerrar, eliminar).
// Se usa con key={reporte.id} para que la unidad elegida se reinicie al cambiar de reporte.
export default function DetalleReporte({ reporte: r, onActualizar, onEliminar }) {
  const [unidad, setUnidad] = useState('')
  const nombreGrupo = GRUPOS.find((g) => g.codigo === r.grupo)?.nombre

  return (
    <section className="detalle">
      <h3>Reporte {r.radicado}</h3>
      <p><b>{r.nombres} {r.apellidos}</b> · {r.telefono}</p>
      <p><b>{r.grupo}</b> {nombreGrupo}</p>
      <p>«{r.queVe}»</p>
      <p>{r.direccion}, {r.barrio}<br />Ref: {r.referencia}<br />Edificio: {r.noAplica ? 'No aplica' : r.edificio}</p>
      <div className="miniaturas">{r.fotos?.map((u, i) => <img key={i} src={u} alt="Foto del reporte" />)}</div>
      <p><a href={`https://www.google.com/maps?q=${r.lat},${r.lng}`} target="_blank" rel="noreferrer">Ver en Google Maps</a></p>
      <p>Estado: <span className="estado">{r.estado}</span>{r.unidad && ` · ${r.unidad}`}</p>

      <a className="btn" href={`tel:${r.telefono}`}>Llamar</a>

      {r.estado === 'Recibido' && (
        <div className="acciones">
          <label>Corregir grupo
            <select value={r.grupo} onChange={(e) => onActualizar({ grupo: Number(e.target.value) })}>
              {GRUPOS.map((g) => <option key={g.codigo} value={g.codigo}>{g.codigo} · {g.nombre}</option>)}
            </select>
          </label>
          <button className="btn" onClick={() => onActualizar({ estado: 'Validado' })}>Validar</button>
          <button className="btn btn--claro" onClick={() => onActualizar({ estado: 'Descartado' })}>Descartar</button>
        </div>
      )}

      <div className="acciones">
        <select value={unidad} onChange={(e) => setUnidad(e.target.value)} disabled={r.estado !== 'Validado'}>
          <option value="">Unidad…</option>
          {UNIDADES.map((u) => <option key={u}>{u}</option>)}
        </select>
        <button className="btn" disabled={r.estado !== 'Validado' || !unidad}
          onClick={() => onActualizar({ estado: 'Unidad despachada', unidad })}>Despachar</button>
        {r.estado === 'Unidad despachada' && (
          <button className="btn" onClick={() => onActualizar({ estado: 'Cerrado' })}>Cerrar caso</button>
        )}
      </div>

      <div className="acciones">
        <button className="btn btn--claro" onClick={() => confirm(`¿Eliminar el reporte ${r.radicado} definitivamente?`) && onEliminar()}>
          Eliminar reporte
        </button>
      </div>
    </section>
  )
}
