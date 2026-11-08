import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float, Environment, Lightformer } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'
import { Suspense, useMemo, useRef, useState } from 'react'

// Extintor 3D real (public/models/FE.obj).
// El .mtl viene con todo en negro (export de V-Ray), así que NO lo usamos:
// reasignamos materiales por el nombre que trae cada parte del .obj.
const COLORES = ['#dc2626', '#ea580c', '#2563eb']
const CROMO = new THREE.MeshStandardMaterial({ color: '#e5e7eb', metalness: 1, roughness: 0.2 })

function Extintor() {
  const obj = useLoader(OBJLoader, '/models/FE.obj')
  const ref = useRef()
  const [hover, setHover] = useState(false)
  const [i, setI] = useState(0)

  const { modelo, cuerpo } = useMemo(() => {
    const m = obj.clone()
    const cuerpo = new THREE.MeshStandardMaterial({ color: COLORES[0], metalness: 0.4, roughness: 0.3 })
    const mats = {
      VRayMtl1SG: cuerpo,                                                          // tanque rojo
      VRayMtl3SG: new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.6 }), // manguera
      VRayMtl6SG: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.5 }), // etiqueta
    }
    // El resto (válvula, palancas, cuello) queda cromado
    m.traverse((o) => { if (o.isMesh) o.material = mats[o.material.name] ?? CROMO })
    // Centrar sobre el eje del tanque (x≈0.08, z≈-0.73) para que gire sobre sí mismo
    const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3())
    m.position.set(-0.08, -c.y, 0.73)
    return { modelo: m, cuerpo }
  }, [obj])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * (hover ? 3 : 0.8)
    const s = ref.current.scale.x + ((hover ? 1.15 : 1) - ref.current.scale.x) * 0.12
    ref.current.scale.setScalar(s)
  })

  const siguiente = () => {
    const n = (i + 1) % COLORES.length
    setI(n)
    cuerpo.color.set(COLORES[n])
  }

  return (
    <group ref={ref} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={siguiente}>
      {/* el modelo mide ~11.7 de alto: lo escalamos a ~3.2 */}
      <group scale={0.27}><primitive object={modelo} /></group>
    </group>
  )
}

export default function EscenaLanding() {
  return (
    <Canvas camera={{ position: [0, 0.4, 6.5], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      {/* Entorno creado en código (sin descargar nada) para que el cromo se vea metálico */}
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.5} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer intensity={1.5} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Float speed={2} floatIntensity={0.6}><Extintor /></Float>
      </Suspense>
    </Canvas>
  )
}
