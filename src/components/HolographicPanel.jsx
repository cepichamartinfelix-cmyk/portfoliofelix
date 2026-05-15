import { useState } from 'react'

const sections = [
  { id: 'hero', label: 'Inicio', icon: '◈' },
  { id: 'stack', label: 'Stack', icon: '◇' },
  { id: 'experience', label: 'Trayectoria', icon: '◉' },
]

export default function HolographicPanel() {
  const [active, setActive] = useState('hero')
  const [expanded, setExpanded] = useState(true)

  const scrollTo = (id) => {
    setActive(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        expanded ? 'translate-x-0' : 'translate-x-[calc(100%-2.5rem)]'
      }`}
    >
      <div className="backdrop-blur-2xl bg-black/50 border border-blue-500/10 rounded-l-2xl p-3 shadow-[0_0_40px_rgba(59,130,246,0.08),inset_0_0_30px_rgba(59,130,246,0.03)]">
        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-12 backdrop-blur-xl bg-black/60 border border-blue-500/10 rounded-l-md flex items-center justify-center text-blue-400/50 hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px]">{expanded ? '›' : '‹'}</span>
        </button>

        <div className={`flex flex-col gap-3 transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                active === s.id
                  ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-sm">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
