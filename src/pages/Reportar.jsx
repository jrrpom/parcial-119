import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GRUPOS, colorDeGrupo } from '../data/grupos.js'
import { BARRIOS } from '../data/barrios.js'
import { useReportes } from '../context/ReportesContext.jsx'
import { validarReporte } from '../utils/validarReporte.js'
import Campo from '../components/Campo.jsx'
import SubidorFotos from '../components/SubidorFotos.jsx'
import ConfirmacionReporte from '../components/ConfirmacionReporte.jsx'

const VACIO = { nombres: '', apellidos: '', telefono: '', grupo: '', queVe: '', direccion: '', barrio: '', referencia: '', edificio: '', noAplica: false }

export default function Reportar() {
  const { reportes, agregar } = useReportes()
  const [f, setF] = useState(VACIO)
  const [tocado, setTocado] = useState({})
  const [fotos, setFotos] = useState([])
  const [enviadoId, setEnviadoId] = useState(() => Number(localStorage.getItem('119-ultimo')) || null)

  const errores = validarReporte(f)
  const valido = Object.keys(errores).length === 0
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value })
  // Props comunes de un campo controlado (valor, cambio y "tocado" al salir)
  const en = (k) => ({ value: f[k], onChange: set(k), onBlur: () => setTocado({ ...tocado, [k]: true }) })
  const err = (k) => tocado[k] && errores[k]

  const enviar = (ev) => {
    ev.preventDefault()
    if (!valido) return
    const b = BARRIOS.find((x) => x.nombre === f.barrio)
    const id = agregar({ ...f, grupo: Number(f.grupo), lat: b.lat, lng: b.lng, fotos })
    localStorage.setItem('119-ultimo', id)
    setEnviadoId(id)
  }

  const nuevo = () => {
    localStorage.removeItem('119-ultimo')
    setEnviadoId(null); setF(VACIO); setFotos([]); setTocado({})
  }

  const enviado = reportes.find((r) => r.id === enviadoId)
  if (enviado) return <ConfirmacionReporte reporte={enviado} onNuevo={nuevo} />

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
            <select {...en('barrio')}>
              <option value="">Selecciona…</option>
              {BARRIOS.map((b) => <option key={b.nombre}>{b.nombre}</option>)}
            </select>
          </Campo>
          <Campo etiqueta="Punto de referencia" error={err('referencia')}><input {...en('referencia')} /></Campo>
          <Campo etiqueta="Nombre del edificio" error={err('edificio')}><input {...en('edificio')} disabled={f.noAplica} /></Campo>
          <label className="check"><input type="checkbox" checked={f.noAplica} onChange={set('noAplica')} /> No aplica</label>
        </fieldset>
        <SubidorFotos fotos={fotos} onChange={setFotos} />
        <button className="btn" disabled={!valido}>Enviar reporte</button>
        {!valido && <small> Completa los campos obligatorios para enviar.</small>}
      </form>
    </main>
  )
}
