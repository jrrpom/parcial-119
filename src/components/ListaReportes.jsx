import { colorDeGrupo } from '../data/grupos.js'

// Lista de reportes del operador: color y código del grupo, hora, barrio y estado.
export default function ListaReportes({ reportes, seleccionadoId, onSeleccionar }) {
  return (
    <ul className="lista">
      {reportes.map((x) => (
        <li key={x.id}>
          <button onClick={() => onSeleccionar(x.id)} className={x.id === seleccionadoId ? 'activo' : ''}>
            <span className="punto" style={{ background: colorDeGrupo(x.grupo) }} />
            <b>{x.grupo}</b> · {x.barrio}
            <small>{new Date(x.hora).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })} · {x.estado}</small>
          </button>
        </li>
      ))}
    </ul>
  )
}
