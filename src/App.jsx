import { Suspense, lazy } from 'react'
import TechBadge from './components/TechBadge'
import ExperienceTimeline from './components/ExperienceTimeline'
import StackGrid from './components/StackGrid'
import HolographicPanel from './components/HolographicPanel'

const Hero3D = lazy(() => import('./components/Hero3D'))

export default function App() {
  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen selection:bg-blue-500/30">
      {/* HERO - THE SENTINEL */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
            <Hero3D />
          </Suspense>
        </div>

        {/* Grid de fondo sutil */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <div className="inline-block mb-6 px-4 py-1.5 backdrop-blur-md bg-white/[0.03] border border-blue-500/10 rounded-full text-xs text-blue-300/70 uppercase tracking-[0.3em] font-mono">
            Sala de Control de Datos
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            FÉLIX HERNÁNDEZ
          </h1>

          <p className="text-xl md:text-2xl font-light text-blue-200/60 mb-8 uppercase tracking-[0.2em]">
            Ingeniero de Software | DevOps | Arquitectura IA
          </p>

          <div className="flex flex-wrap justify-center max-w-2xl mx-auto relative">
            {['Cypress', 'Playwright', 'AWS', 'IA Engineering', 'React', 'Kubernetes'].map(skill => (
              <TechBadge key={skill} text={skill} />
            ))}
          </div>

          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* STACK TÉCNICO */}
      <StackGrid />

      {/* EXPERIENCIA */}
      <ExperienceTimeline />

      {/* FOOTER */}
      <footer className="border-t border-gray-800/50 py-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Félix Hernández Graterol. Asesor Profesional de Tecnología.</p>
      </footer>

      {/* Panel Holográfico Lateral */}
      <HolographicPanel />
    </div>
  )
}
