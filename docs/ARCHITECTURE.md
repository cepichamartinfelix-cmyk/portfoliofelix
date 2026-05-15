# Arquitectura de Componentes

```
App
├── Hero3D (lazy)
│   └── Canvas (@react-three/fiber)
│       ├── EffectComposer + Bloom
│       ├── RobotServer
│       │   ├── RoboticArm (Cartesian)
│       │   ├── DataLines (Fiber Optic)
│       │   ├── DataParticles (300 points)
│       │   ├── PulsingLED (5 units)
│       │   └── IA Nucleus (Sphere + PointLight)
│       └── OrbitControls
├── StackGrid
│   └── 4 CategoryCards
├── ExperienceTimeline
│   └── 3 ExperienceEntries
├── HolographicPanel
│   └── 3 NavButtons
└── Footer
```

## Dependencias externas

```
react-dom ← App ← Hero3D
                ← StackGrid
                ← ExperienceTimeline
                ← HolographicPanel

@react-three/fiber ← Hero3D
  ├── @react-three/drei (Float, Line, MeshDistortMaterial)
  ├── @react-three/postprocessing (EffectComposer, Bloom)
  ├── postprocessing (blend modes)
  └── three (THREE.*)
```

## Flujo de datos

```
Pointer Event → mouseRef → useFrame → mesh.rotation
Hash/ID click → scrollIntoView → activeSection state
npm run build → ./dist/ → GitHub Actions → GitHub Pages
```
