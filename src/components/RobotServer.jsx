import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'

function RoboticArm({ side }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 1.1, -1.2, 0),
    new THREE.Vector3(side * 2.2, -0.2, 0.4),
    new THREE.Vector3(side * 1.8, 1.0, -0.3),
    new THREE.Vector3(side * 1.0, 1.8, 0.2),
  ]), [side])

  return (
    <mesh>
      <tubeGeometry args={[curve, 48, 0.035, 8, false]} />
      <meshPhysicalMaterial
        color="#3b82f6"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.25}
        emissive="#3b82f6"
        emissiveIntensity={0.3}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}

function DataLines({ side }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 30; i++) {
      const t = i / 30
      pts.push(new THREE.Vector3(
        side * (1.2 + t * 2.5),
        Math.sin(t * Math.PI * 3) * 0.8,
        Math.cos(t * Math.PI * 2) * 0.2
      ))
    }
    return pts
  }, [side])

  return (
    <Line
      points={points}
      color="#00f0ff"
      lineWidth={1}
      transparent
      opacity={0.15}
    />
  )
}

function DataParticles() {
  const count = 300
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      const r = 1.5 + Math.random() * 3
      pos[i * 3] = Math.sin(theta) * Math.cos(phi) * r
      pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
      pos[i * 3 + 2] = Math.cos(theta) * r * 0.5
      spd[i] = 0.2 + Math.random() * 0.5
    }
    return { positions: pos, speeds: spd }
  }, [])

  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const angle = t * speeds[i]
        const r = 1.5 + Math.sin(angle) * 0.5
        const theta = i * 0.1 + t * 0.1
        const phi = i * 0.05 + t * 0.05
        pos[i * 3] = Math.sin(theta) * Math.cos(phi) * r
        pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
        pos[i * 3 + 2] = Math.cos(theta) * r * 0.5
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#3b82f6"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function RobotServer() {
  const meshRef = useRef()
  const mouseRef = useRef([0, 0])
  const ledRefs = useRef([])
  ledRefs.current = []

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
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.15 + mx * 0.4
      meshRef.current.rotation.x = my * 0.25
      meshRef.current.position.y = Math.sin(t / 1.5) * 0.08
    }
  })

  return (
    <group ref={meshRef} onPointerMove={handlePointerMove}>
      {/* Cuerpo Principal del Servidor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Detalles de rack - líneas horizontales */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`grill-${i}`} position={[0, 1.2 - i * 0.45, 0.26]}>
          <planeGeometry args={[1.6, 0.02]} />
          <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.8} />
        </mesh>
      ))}

      {/* LEDs de Actividad con pulso */}
      {[...Array(5)].map((_, i) => (
        <PulsingLED key={`led-${i}`} y={1 - i * 0.5} index={i} />
      ))}

      {/* Brazos Robóticos */}
      <RoboticArm side={1} />
      <RoboticArm side={-1} />

      {/* Líneas de Datos (Fibra Óptica) */}
      <DataLines side={1} />
      <DataLines side={-1} />

      {/* Partículas de Datos */}
      <DataParticles />

      {/* Núcleo de IA Radiante */}
      <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[0, 0, 0.4]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <MeshDistortMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={2}
            speed={3}
            distort={0.4}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
        <pointLight
          position={[0, 0, 0.4]}
          intensity={8}
          distance={3}
          color="#3b82f6"
        />
      </Float>
    </group>
  )
}

function PulsingLED({ y, index }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.5 + 0.5
      ref.current.emissiveIntensity = 1.5 + pulse * 2
    }
  })

  return (
    <mesh position={[0.7, y, 0.26]}>
      <planeGeometry args={[0.2, 0.05]} />
      <meshStandardMaterial
        ref={ref}
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={2}
      />
    </mesh>
  )
}
