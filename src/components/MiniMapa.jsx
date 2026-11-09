import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../mapa/mapa.css'
import { crearIcono } from '../mapa/iconos.js'

// Escucha los clics del mapa con useMapEvents
function Clic({ onElegir }) {
  useMapEvents({ click: (e) => onElegir({ lat: e.latlng.lat, lng: e.latlng.lng }) })
  return null
}
// Vuela al barrio elegido
function Centrar({ centro }) {
  const map = useMap()
  useEffect(() => { if (centro) map.flyTo([centro.lat, centro.lng], 16, { duration: 0.6 }) }, [centro, map])
  return null
}

// Mini mapa para tocar el punto exacto de la emergencia.
export default function MiniMapa({ punto, centro, onElegir, color = '#dc2626' }) {
  return (
    <div className="minimapa">
      <MapContainer center={[3.437, -76.522]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Clic onElegir={onElegir} />
        <Centrar centro={centro} />
        {punto && <Marker position={[punto.lat, punto.lng]} icon={crearIcono(color)} />}
      </MapContainer>
    </div>
  )
}
