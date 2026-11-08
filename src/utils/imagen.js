// Convierte un archivo de imagen en un data URL pequeño (máx. 800 px, JPEG 0.7),
// para que se pueda guardar en localStorage y sobreviva a recargar la página.
export function comprimirImagen(archivo, max = 800) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo)
    const img = new Image()
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * k)
      c.height = Math.round(img.height * k)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', 0.7))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagen no válida')) }
    img.src = url
  })
}
