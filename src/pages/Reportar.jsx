import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GRUPOS, colorDeGrupo } from '../data/grupos.js'
import { BARRIOS } from '../data/barrios.js'
import { useReportes } from '../context/ReportesContext.jsx'
import { validarReporte } from '../utils/validarReporte.js'
import Campo from '../components/Campo.jsx'
import SubidorFotos from '../components/SubidorFotos.jsx'
import MiniMapa from '../components/MiniMapa.jsx'
import ConfirmacionReporte from '../components/ConfirmacionReporte.jsx'

const VACIO = { nombres: '', apellidos: '', telefono: '', grupo: '', queVe: '', direccion: '', barrio: '', referencia: '', edificio: '', noAplica: false, sexo: '', edad: '', consciente: '', respira: '' }
const SI_NO = ['Sí', 'No', 'No sé']

export default function Reportar() {
  const { reportes, agregar, actualizar } = useReportes()
  const [f, setF] = useState(VACIO)
  const [tocado, setTocado] = useState({})
  const [medios, setMedios] = useState([])
  const [punto, setPunto] = useState(null) // punto exacto tocado en el mini mapa
  const [enviadoId, setEnviadoId] = useState(() => Number(localStorage.getItem('119-ultimo')) || null)

  const errores = validarReporte(f)
  const valido = Object.keys(errores).length === 0
  const barrio = BARRIOS.find((x) => x.nombre === f.barrio)
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value })
  const en = (k) => ({ value: f[k], onChange: set(k), onBlur: () => setTocado({ ...tocado, [k]: true }) })
  const err = (k) => tocado[k] && errores[k]
  const opciones = (lista) => (<><option value="">Selecciona…</option>{lista.map((o) => <option key={o}>{o}</option>)}</>)

  const enviar = (ev) => {
    ev.preventDefault()
    if (!valido) return
    const p = punto ?? barrio
    const id = agregar({ ...f, grupo: Number(f.grupo), lat: p.lat, lng: p.lng, ubicacionExacta: !!punto, medios })
    localStorage.setItem('119-ultimo', id)
    setEnviadoId(id)
  }

  const nuevo = () => {
    localStorage.removeItem('119-ultimo')
    setEnviadoId(null); setF(VACIO); setMedios([]); setTocado({}); setPunto(null)
  }

  const enviado = reportes.find((r) => r.id === enviadoId)
  if (enviado) return <ConfirmacionReporte reporte={enviado} onNuevo={nuevo} onEntendido={() => actualizar(enviado.id, { aviso: null })} />

  return (
    <main className="pagina">
      <Link to="/">← Inicio</Link>
      <h1>Reportar emergencia</h1>
      <p>Si hay riesgo inmediato, llama al <a href="tel:119">119</a>.</p>
      <form onSubmit={enviar} noValidate className="form">
        <fieldset><legend>Tus datos</legend>
          <Campo etiqueta="Nombres" error={err('nombres')}><input {...en('nombres')} /></Campo>
          <Campo etiqueta="Apellidos" error={err('apellidos')}><input {...en('apellidos')} /></Campo>
          <Campo etiqueta="Teléfono" error={err('telefono')}><input {...en('telefono')} inputMode="numeric" maxLength={10} /></Campo>
        </fieldset>
        <fieldset><legend>La emergencia</legend>
          <Campo etiqueta="Grupo de emergencia" error={err('grupo')}>
            <select {...en('grupo')} style={{ borderLeft: `8px solid ${f.grupo ? colorDeGrupo(Number(f.grupo)) : '#ccc'}` }}>
              <option value="">Selecciona…</option>
              {GRUPOS.map((g) => <option key={g.codigo} value={g.codigo}>{g.codigo} · {g.nombre}</option>)}
            </select>
          </Campo>
          <Campo etiqueta="¿Qué ve?" error={err('queVe')}><textarea rows={3} {...en('queVe')} /></Campo>
          <Campo etiqueta="Dirección" error={err('direccion')}><input {...en('direccion')} /></Campo>
          <Campo etiqueta="Barrio" error={err('barrio')}>
            <select {...en('barrio')} onChange={(e) => { set('barrio')(e); setPunto(null) }}>
              <option value="">Selecciona…</option>
              {BARRIOS.map((b) => <option key={b.nombre}>{b.nombre}</option>)}
            </select>
          </Campo>
          <div className="campo">
            <span>Punto exacto (opcional)</span>
            <MiniMapa punto={punto ?? barrio} centro={barrio} onElegir={setPunto} color={f.grupo ? colorDeGrupo(Number(f.grupo)) : undefined} />
            <small>{punto ? '✔ Punto exacto marcado' : 'Toca el mapa para marcar el punto exacto; si no, se usa el centro del barrio.'}</small>
          </div>
          <Campo etiqueta="Punto de referencia" error={err('referencia')}><input {...en('referencia')} /></Campo>
          <Campo etiqueta="Nombre del edificio" error={err('edificio')}><input {...en('edificio')} disabled={f.noAplica} /></Campo>
          <label className="check"><input type="checkbox" checked={f.noAplica} onChange={set('noAplica')} /> No aplica</label>
        </fieldset>
        {f.grupo === '300' && (
          <fieldset><legend>Preguntas de continuación (rescates y emergencias médicas)</legend>
            <Campo etiqueta="Sexo del paciente" error={err('sexo')}><select {...en('sexo')}>{opciones(['Femenino', 'Masculino', 'No sé'])}</select></Campo>
            <Campo etiqueta="Edad (años)" error={err('edad')}><input {...en('edad')} inputMode="numeric" maxLength={3} /></Campo>
            <Campo etiqueta="¿Está consciente?" error={err('consciente')}><select {...en('consciente')}>{opciones(SI_NO)}</select></Campo>
            <Campo etiqueta="¿Respira?" error={err('respira')}><select {...en('respira')}>{opciones(SI_NO)}</select></Campo>
          </fieldset>
        )}
        <SubidorFotos medios={medios} onChange={setMedios} />
        <button className="btn" disabled={!valido}>Enviar reporte</button>
        {!valido && <small> Completa los campos obligatorios para enviar.</small>}
      </form>
    </main>
  )
}
