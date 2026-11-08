// Tarjeta de un grupo de emergencia (código, nombre y color).
export default function TarjetaGrupo({ grupo }) {
  return (
    <article className="tarjeta" style={{ borderTopColor: grupo.color }}>
      <strong style={{ color: grupo.color }}>{grupo.codigo}</strong>
      <span>{grupo.nombre}</span>
    </article>
  )
}
