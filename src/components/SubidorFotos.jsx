import { useState } from 'react'
import { comprimirImagen } from '../utils/imagen.js'
import RecomendacionesMedios from './RecomendacionesMedios.jsx'

const MAX_VIDEO = 15 * 1024 * 1024

// Selector de fotos y videos (hasta `max` en total). El estado (medios) vive en el padre.
// medios: [{ tipo: 'foto' | 'video', url }]
export default function SubidorFotos({ medios, onChange, max = 3 }) {
  const [aviso, setAviso] = useState('')

  const elegir = async (ev) => {
    const archivos = [...ev.target.files].slice(0, max - medios.length)
    ev.target.value = ''
    const nuevos = await Promise.all(archivos.map(async (a) => {
      if (a.type.startsWith('video/')) return a.size <= MAX_VIDEO ? { tipo: 'video', url: URL.createObjectURL(a) } : null
      return comprimirImagen(a).then((url) => ({ tipo: 'foto', url })).catch(() => null)
    }))
    setAviso(nuevos.includes(null) ? 'Algún archivo no se pudo agregar (videos: máx. 15 MB).' : '')
    onChange([...medios, ...nuevos.filter(Boolean)].slice(0, max))
  }

  return (
    <fieldset>
      <legend>Fotos y videos (máx. {max})</legend>
      <input type="file" multiple accept="image/*,video/*" onChange={elegir} disabled={medios.length >= max} />
      <RecomendacionesMedios />
      {aviso && <small className="error">{aviso}</small>}
      <div className="miniaturas">
        {medios.map((m, i) => (
          <div key={i}>
            {m.tipo === 'video' ? <video src={m.url} muted /> : <img src={m.url} alt={`Foto ${i + 1}`} />}
            <button type="button" onClick={() => onChange(medios.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
