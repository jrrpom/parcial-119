import { comprimirImagen } from '../utils/imagen.js'

// Selector de fotos con miniaturas. El estado (fotos) vive en el padre.
export default function SubidorFotos({ fotos, onChange, max = 3 }) {
  const elegir = async (ev) => {
    const archivos = [...ev.target.files].slice(0, max - fotos.length)
    ev.target.value = ''
    const nuevas = await Promise.all(archivos.map((a) => comprimirImagen(a).catch(() => null)))
    onChange([...fotos, ...nuevas.filter(Boolean)].slice(0, max))
  }

  return (
    <fieldset>
      <legend>Fotos (máx. {max})</legend>
      <input type="file" multiple accept="image/*" onChange={elegir} disabled={fotos.length >= max} />
      <div className="miniaturas">
        {fotos.map((u, i) => (
          <div key={i}>
            <img src={u} alt={`Foto ${i + 1}`} />
            <button type="button" onClick={() => onChange(fotos.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
