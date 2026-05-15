import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import RobotServer from './RobotServer'

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, toneMapping: 3 }}
      style={{ background: 'radial-gradient(ellipse at center, #0a1628 0%, #0a0a0a 100%)' }}
      aria-label="Simulación 3D de servidor robótico interactivo"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#3b82f6" />
      <RobotServer />
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
      <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} />
    </Canvas>
  )
}
