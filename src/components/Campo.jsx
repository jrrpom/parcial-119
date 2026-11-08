// Envoltura de un campo del formulario: etiqueta + control + mensaje de error.
export default function Campo({ etiqueta, error, children }) {
  return (
    <label className="campo">
      <span>{etiqueta}</span>
      {children}
      {error && <small className="error">{error}</small>}
    </label>
  )
}
