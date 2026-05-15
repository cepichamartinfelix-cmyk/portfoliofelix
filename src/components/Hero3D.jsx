import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RobotServer from './RobotServer'

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      aria-label="Simulación 3D de servidor robótico interactivo"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#3b82f6" />
      <RobotServer />
      <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} />
    </Canvas>
  )
}
