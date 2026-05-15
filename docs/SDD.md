# SDD - Documento de Diseño de Software
## Portfolio Inmersivo "The Sentinel"

| Campo | Valor |
|-------|-------|
| **Autor** | Félix Hernández Graterol |
| **Rol** | Asesor Profesional de Tecnología e Ingeniero de Software |
| **Repositorio** | `https://github.com/cepichamartinfelix-cmyk/portfoliofelix` |
| **URL Producción** | `https://cepichamartinfelix-cmyk.github.io/portfoliofelix/` |
| **Versión** | 1.0.0 |

---

## 1. Propósito del Sistema

Landing page de alto rendimiento para exhibir expertise en **DevOps, Automatización e IA**. El sistema presenta una visualización 3D interactiva ("The Sentinel") como núcleo visual, representando la convergencia entre infraestructura de servidores e inteligencia artificial.

---

## 2. Arquitectura de Componentes

### 2.1 Árbol de Componentes

```
App (Layout principal)
├── Hero3D (lazy)              ← Chunk separado (lazy loading)
│   ├── Canvas (react-three-fiber)
│   │   ├── EffectComposer + Bloom
│   │   ├── RobotServer
│   │   │   ├── RoboticArm × 2
│   │   │   ├── DataLines × 2
│   │   │   ├── DataParticles (300 pts)
│   │   │   ├── PulsingLED × 5
│   │   │   └── IA Nucleus + PointLight
│   │   └── OrbitControls
│   └── UI Overlay (z-index superior)
│       ├── Título (gradiente + drop-shadow)
│       ├── TechBadge × 6
│       └── Scroll indicator
├── StackGrid (id="stack")
│   └── CategoryCard × 4 (Automatización, Cloud, Backend, Frontend)
├── ExperienceTimeline (id="experience")
│   └── ExperienceEntry × 3
├── HolographicPanel (fixed)
│   └── NavButton × 3
└── Footer
```

### 2.2 Diagrama de Dependencias

```
src/
├── main.jsx                  → Punto de entrada React
├── index.css                 → Directivas Tailwind
├── App.jsx                   → Layout + lazy(Hero3D)
├── components/
│   ├── Hero3D.jsx            → Canvas + EffectComposer + RobotServer
│   ├── RobotServer.jsx       → Lógica 3D (group, useFrame)
│   ├── TechBadge.jsx         → Componente atómico (glass-morphism)
│   ├── StackGrid.jsx         → Grilla técnica con gradient cards
│   ├── ExperienceTimeline.jsx→ Timeline profesional
│   └── HolographicPanel.jsx  → Navegación lateral fija
```

---

## 3. Módulos Técnicos

### 3.1 Hero3D + RobotServer ("The Sentinel")

**Capa de visualización 3D** basada en primitivas de Three.js:

| Elemento | Geometría | Material | Propósito |
|----------|-----------|----------|-----------|
| Rack principal | `BoxGeometry(2, 3, 0.5)` | `MeshStandardMaterial` metalness=0.85 | Cuerpo del servidor |
| Brazos robóticos | `TubeGeometry` (CatmullRomCurve3) | `MeshPhysicalMaterial` opacidad=0.25 | Brazos robóticos transparentes |
| LEDs | `PlaneGeometry(0.2, 0.05)` | `MeshStandardMaterial` emissivo | Actividad pulsante |
| Núcleo IA | `SphereGeometry(0.35)` | `MeshDistortMaterial` + PointLight | Inteligencia central |
| Líneas de datos | `Line` (30 puntos) | Emissivo cian (0x00f0ff) | Fibra óptica |
| Partículas | `Points` (300) | `PointsMaterial` + AdditiveBlending | Flujo de datos |

**Interactividad:**
- Seguimiento de cursor (`onPointerMove`) → rotación suave en X/Y
- `useFrame` para animación continua de rotación + flotación

### 3.2 Post-Processing (Bloom)

```jsx
<EffectComposer>
  <Bloom intensity={0.8} luminanceThreshold={0.15} luminanceSmoothing={0.85} mipmapBlur />
</EffectComposer>
```

### 3.3 StackGrid

Grilla 4 columnas (responsive: 2 en md, 4 en lg) con tarjetas gradiente por categoría:

| Categoría | Técnicas | Color |
|-----------|----------|-------|
| Automatización | Cypress, Playwright, Selenium, Jenkins, GitHub Actions | Azul |
| Cloud & DevOps | AWS, Docker, Kubernetes, Terraform, Linux | Cian |
| Backend | Node.js, Python, Laravel, PostgreSQL, MongoDB | Púrpura |
| Frontend | React, Next.js, Tailwind, Three.js, TypeScript | Verde |

### 3.4 ExperienceTimeline

Línea de tiempo vertical con 3 entradas:
- **MicaGroup** (2024-presente) — Automatización E2E + CI/CD
- **BulwarkPhone** (2021-2023) — Full Stack + IA
- **Red Salud** (2019-2021) — Desarrollo de software

### 3.5 HolographicPanel

Panel fijo lateral derecho con:
- Vidrio holográfico (`backdrop-blur-2xl bg-black/50`)
- 3 botones de navegación (Inicio, Stack, Trayectoria)
- Scroll suave (`scrollIntoView({ behavior: 'smooth' })`)
- Colapsable (toggle con animación)

### 3.6 TechBadge

Componente atómico con estilo glass-morphism:
```css
backdrop-blur-xl bg-white/[0.04] border-white/[0.08]
shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]
hover:bg-white/[0.08] hover:border-blue-400/30
```

---

## 4. Flujo de Datos

### 4.1 Carga Inicial
```
index.html → main.jsx → App.jsx
  ├── Render inmediato: UI overlay (título, badges)
  └── Suspense + lazy: Hero3D (se carga asíncrono)
```

### 4.2 Interacción 3D
```
PointerMove en Canvas
  → mouseRef.current = [mx, my]
  → useFrame() cada frame
    → meshRef.current.rotation.y = sin(t/2)*0.15 + mx*0.4
    → meshRef.current.rotation.x = my*0.25
```

### 4.3 Navegación
```
Click en HolographicPanel
  → scrollTo(id)
  → setActive(id) ← estado local del panel
```

---

## 5. Especificaciones de Rendimiento

### 5.1 Métricas Lighthouse (objetivo)

| Métrica | Target |
|---------|--------|
| Performance | ≥ 95 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 95 |
| SEO | ≥ 90 |

### 5.2 Optimizaciones aplicadas

| Optimización | Impacto |
|-------------|---------|
| `lazy()` + `Suspense` en Hero3D | El chunk 3D (930KB) no bloquea el render inicial |
| Bundle principal separado | Solo 152KB (gzip: 50KB) para carga instantánea |
| Polígonos reducidos | SphereGeometry(32×32) en vez de 100×200 |
| `AdditiveBlending` en partículas | Eficiente para GPU |
| Sin texturas externas | Todo son primitivas Three.js, 0 descargas de assets |
| Tailwind CSS purgado | Solo CSS usado en producción (30KB) |

### 5.3 Tamaños de Chunk

| Chunk | Tamaño | Gzip | Tipo |
|-------|--------|------|------|
| `index.html` | 0.9 KB | 0.45 KB | — |
| `index-*.css` | 30.6 KB | 5.7 KB | Síncrono |
| `index-*.js` | 152.5 KB | 49.6 KB | Síncrono |
| `Hero3D-*.js` | 929.8 KB | 248.9 KB | Lazy (asíncrono) |

---

## 6. Pipeline de Despliegue

### 6.1 Workflow GitHub Actions

```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }

  deploy:
    needs: build
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 6.2 Ciclo de Vida

```
git push origin main
  → GitHub Actions detecta push
    → npm ci + npm run build
    → upload-pages-artifact (./dist)
    → deploy-pages GA
      → https://cepichamartinfelix-cmyk.github.io/portfoliofelix/
```

---

## 7. Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | ^18.3.1 | UI framework |
| Vite | ^6.0.0 | Build tool |
| Tailwind CSS | ^4.0.0 | Estilos utilitarios |
| Three.js | ^0.170.0 | Motor 3D |
| @react-three/fiber | ^8.17.0 | Renderer declarativo 3D |
| @react-three/drei | ^9.114.0 | Utilidades 3D (Float, Line, etc.) |
| @react-three/postprocessing | ^2.19.1 | Efectos post-procesamiento (Bloom) |
| postprocessing | ^6.39.1 | Motor de efectos visuales |
| lucide-react | ^0.468.0 | Iconos |
| GitHub Pages | — | Hosting estático |

---

## 8. Convenciones de Código

- **Nombrado**: Componentes en PascalCase, archivos en PascalCase.jsx
- **Importaciones**: React primero, luego librerías externas, luego componentes locales
- **Estilos**: Tailwind CSS utilitario, sin CSS modules
- **Comentarios**: Solo para secciones, no para lógica evidente
- **Hooks**: `useRef` para referencias 3D, `useFrame` para animaciones, `useMemo` para geometrías estáticas

---

## 9. Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2026-05-15 | Release inicial: Hero 3D + StackGrid + Timeline + Panel holográfico |
