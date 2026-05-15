# Portfolio Inmersivo — Félix Hernández

[![Deploy to GitHub Pages](https://github.com/cepichamartinfelix-cmyk/portfoliofelix/actions/workflows/deploy.yml/badge.svg)](https://github.com/cepichamartinfelix-cmyk/portfoliofelix/actions/workflows/deploy.yml)

Landing page de alto rendimiento con visualización 3D interactiva. Exhibe experiencia en **DevOps, Automatización e IA** a través de un servidor robotizado ("The Sentinel") construido con primitivas de Three.js.

## Stack

| Frontend | 3D | Infraestructura |
|----------|-----|-----------------|
| React 18 + Vite 6 | Three.js + @react-three/fiber | GitHub Pages |
| Tailwind CSS 4 | @react-three/drei | GitHub Actions |
| — | Bloom (postprocessing) | CI/CD automatizado |

## Componentes principales

```
Hero3D           → Visualización 3D con servidor robotizado interactivo
StackGrid        → Grilla técnica (Automatización, Cloud, Backend, Frontend)
ExperienceTimeline → Línea de tiempo profesional
HolographicPanel → Navegación lateral con efecto vidrio
TechBadge        → Componente atómico glass-morphism
```

## Desarrollo local

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → ./dist/
npm run preview    # Vista previa del build
```

## Despliegue

Cada push a `main` activa el workflow de GitHub Actions que construye y despliega automáticamente a GitHub Pages.

**URL:** https://cepichamartinfelix-cmyk.github.io/portfoliofelix/

## SDD

Ver [`docs/SDD.md`](./docs/SDD.md) para el Documento de Diseño de Software completo.

---

*Félix Hernández Graterol — Asesor Profesional de Tecnología e Ingeniero de Software*
