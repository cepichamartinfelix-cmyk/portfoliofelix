import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei'

export default function RobotServer() {
  const meshRef = useRef()
  const mouseRef = useRef([0, 0])

  const handlePointerMove = (e) => {
    mouseRef.current = [
      e.clientX / window.innerWidth - 0.5,
      -(e.clientY / window.innerHeight - 0.5),
    ]
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const [mx, my] = mouseRef.current
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.2 + mx * 0.5
      meshRef.current.rotation.x = my * 0.3
      meshRef.current.position.y = Math.sin(t / 1.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} onPointerMove={handlePointerMove}>
      {/* Cuerpo Principal del Servidor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* LEDs de Actividad Robotizada */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0.7, 1 - i * 0.5, 0.26]}>
          <planeGeometry args={[0.2, 0.05]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Núcleo de IA */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[0, 0, 0.4]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial color="#60a5fa" speed={3} distort={0.4} />
        </mesh>
      </Float>

      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    </group>
  )
}
