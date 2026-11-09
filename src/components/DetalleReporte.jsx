import { useState } from 'react'
import { GRUPOS } from '../data/grupos.js'

const UNIDADES = ['Máquina', 'Rescate', 'Ambulancia', 'HazMat']
const CERRADO = ['Cerrado', 'Descartado']

// Detalle de un reporte + acciones del operador.
// Se usa con key={reporte.id} para que la unidad elegida se reinicie al cambiar de reporte.
export default function DetalleReporte({ reporte: r, onActualizar, onEliminar }) {
  const [unidad, setUnidad] = useState('')
  const nombreGrupo = GRUPOS.find((g) => g.codigo === r.grupo)?.nombre

  const pedirInfo = () => {
    const t = prompt('Mensaje para el ciudadano:', 'Por favor envía una foto del lugar y confirma tu ubicación.')
    if (t?.trim()) onActualizar({ aviso: t.trim() })
  }

  return (
    <section className="detalle">
      <h3>Reporte {r.radicado}</h3>
      <p><b>{r.nombres} {r.apellidos}</b> · {r.telefono}</p>
      <p><b>{r.grupo}</b> {nombreGrupo}</p>
      <p>«{r.queVe}»</p>
      {r.grupo === 300 && r.sexo && (
        <p>Paciente: {r.sexo}, {r.edad} años · Consciente: {r.consciente} · Respira: {r.respira}</p>
      )}
      <p>{r.direccion}, {r.barrio}<br />Ref: {r.referencia}<br />Edificio: {r.noAplica ? 'No aplica' : r.edificio}</p>
      <div className="miniaturas">
        {r.medios?.map((m, i) =>
          m.tipo === 'video'
            ? (m.url ? <video key={i} src={m.url} controls className="video-detalle" /> : <p key={i}>🎬 Video disponible solo en la sesión donde se envió.</p>)
            : <img key={i} src={m.url} alt="Foto del reporte" />
        )}
      </div>
      <p>
        {r.ubicacionExacta ? '📍 Punto exacto marcado por el ciudadano' : 'Ubicación aproximada (centro del barrio)'}<br />
        <a href={`https://www.google.com/maps?q=${r.lat},${r.lng}`} target="_blank" rel="noreferrer">Ver en Google Maps</a>
      </p>
      <p>Estado: <span className="estado">{r.estado}</span>{r.unidad && ` · ${r.unidad}`}</p>
      {r.aviso && <p>📨 Información solicitada: «{r.aviso}»</p>}

      <div className="acciones">
        <a className="btn" href={`tel:${r.telefono}`}>Llamar</a>
        {!CERRADO.includes(r.estado) && <button className="btn btn--claro" onClick={pedirInfo}>Solicitar más información</button>}
      </div>

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
        {r.estado === 'Unidad despachada' && <button className="btn" onClick={() => onActualizar({ estado: 'Cerrado' })}>Cerrar caso</button>}
      </div>

      <div className="acciones">
        <button className="btn btn--claro" onClick={() => confirm(`¿Eliminar el reporte ${r.radicado} definitivamente?`) && onEliminar()}>
          Eliminar reporte
        </button>
      </div>
    </section>
  )
}
