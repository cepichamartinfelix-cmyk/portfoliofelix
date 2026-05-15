import { Suspense, lazy } from 'react'
import TechBadge from './components/TechBadge'
import ExperienceTimeline from './components/ExperienceTimeline'
import StackGrid from './components/StackGrid'

const Hero3D = lazy(() => import('./components/Hero3D'))

export default function App() {
  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen selection:bg-blue-500/30">
      {/* HERO - SERVIDOR ROBÓTICO 3D */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
            <Hero3D />
          </Suspense>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            FÉLIX HERNÁNDEZ
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 uppercase tracking-[0.2em]">
            Ingeniero de Software | DevOps | Arquitectura IA
          </p>
          <div className="flex flex-wrap justify-center max-w-2xl mx-auto">
            {['Cypress', 'Playwright', 'AWS', 'IA Engineering', 'React', 'Kubernetes'].map(skill => (
              <TechBadge key={skill} text={skill} />
            ))}
          </div>
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Félix Hernández Graterol. Ingeniero de Software.</p>
      </footer>
    </div>
  )
}
