import { Link } from 'react-router-dom'
import EscenaLanding from '../three/EscenaLanding.jsx'
import TarjetaGrupo from '../components/TarjetaGrupo.jsx'
import { GRUPOS } from '../data/grupos.js'

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero__texto">
          <p className="etiqueta">Bomberos Voluntarios de Cali · Línea 119</p>
          <h1>¿Tienes una emergencia?</h1>
          <p>Reporta con ubicación y fotos. El radio operador recibe tu aviso en el mapa.</p>
          <div className="hero__botones">
            <Link to="/reportar" className="btn btn--grande">Reportar emergencia</Link>
            <a href="tel:119" className="btn btn--claro btn--grande">Llamar al 119</a>
          </div>
        </div>
        <div className="hero__escena"><EscenaLanding /></div>
      </section>
      <section className="grupos">
        <h2>Tipos de emergencia</h2>
        <div className="grupos__grid">
          {GRUPOS.map((g) => <TarjetaGrupo key={g.codigo} grupo={g} />)}
        </div>
      </section>
      <footer><Link to="/operador">Acceso radio operador</Link></footer>
    </div>
  )
}
