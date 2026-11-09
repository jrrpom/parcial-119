import { Link } from 'react-router-dom'

// Respuesta automática: radicado, hora y estado (se actualiza cuando el operador cambia el caso).
// Si el operador pide más información, aparece un aviso.
export default function ConfirmacionReporte({ reporte, onNuevo, onEntendido }) {
  return (
    <main className="pagina confirmacion">
      <h1>Reporte recibido ✅</h1>
      <p>Gracias, {reporte.nombres}. Un radio operador revisará tu reporte.</p>
      {reporte.aviso && (
        <div className="aviso" role="alert">
          <strong>El operador solicita más información:</strong>
          <p>{reporte.aviso}</p>
          <button className="btn" onClick={onEntendido}>Entendido</button>
        </div>
      )}
      <dl>
        <dt>Radicado</dt><dd><strong>{reporte.radicado}</strong></dd>
        <dt>Hora</dt><dd>{new Date(reporte.hora).toLocaleString('es-CO')}</dd>
        <dt>Estado</dt><dd><span className="estado">{reporte.estado}</span>{reporte.unidad && ` · ${reporte.unidad}`}</dd>
      </dl>
      <button className="btn" onClick={onNuevo}>Nuevo reporte</button>{' '}
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}
