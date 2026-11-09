import { useState } from 'react'

// Botón + ventana flotante con recomendaciones para tomar fotos y videos.
export default function RecomendacionesMedios() {
  const [abierto, setAbierto] = useState(false)
  return (
    <>
      <button type="button" className="btn btn--claro" onClick={() => setAbierto(true)}>💡 Cómo tomar fotos y videos</button>
      {abierto && (
        <aside className="flotante" role="dialog" aria-label="Recomendaciones para fotos y videos">
          <button type="button" className="flotante__cerrar" onClick={() => setAbierto(false)}>✕</button>
          <h3>Antes de grabar</h3>
          <ul>
            <li>Tu seguridad primero: no te acerques al peligro.</li>
            <li>Graba en horizontal y desde lejos, para ver todo el lugar.</li>
            <li>Muestra la fachada, el número y puntos de referencia.</li>
            <li>Videos cortos (máx. 15 MB, unos 15 segundos).</li>
            <li>No uses flash cerca de gas o combustibles.</li>
          </ul>
        </aside>
      )}
    </>
  )
}
