// Reglas de validación del formulario. Devuelve { campo: 'mensaje' } solo para los campos con error.
export function validarReporte(f) {
  const e = {}
  if (!f.nombres.trim()) e.nombres = 'Escribe tus nombres'
  if (!f.apellidos.trim()) e.apellidos = 'Escribe tus apellidos'
  if (!/^\d{10}$/.test(f.telefono)) e.telefono = 'Debe tener 10 dígitos, solo números'
  if (!f.grupo) e.grupo = 'Elige un grupo de emergencia'
  if (!f.queVe.trim()) e.queVe = 'Describe qué ves'
  if (!f.direccion.trim()) e.direccion = 'Escribe la dirección'
  if (!f.barrio) e.barrio = 'Elige el barrio'
  if (!f.referencia.trim()) e.referencia = 'Indica un punto de referencia'
  if (!f.noAplica && !f.edificio.trim()) e.edificio = 'Escribe el edificio o marca «No aplica»'
  // Preguntas de continuación del grupo 300
  if (f.grupo === '300') {
    if (!f.sexo) e.sexo = 'Indica el sexo'
    if (!/^\d{1,3}$/.test(f.edad)) e.edad = 'Escribe la edad en años'
    if (!f.consciente) e.consciente = 'Indica si está consciente'
    if (!f.respira) e.respira = 'Indica si respira'
  }
  return e
}
