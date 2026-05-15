const experiences = [
  {
    role: 'Desarrollador de Automatización',
    company: 'MicaGroup',
    period: 'Ene 2024 - Presente',
    description:
      'Diseño e implementación de pruebas E2E con Cypress integradas en pipelines CI/CD (Jenkins), reduciendo incidencias en un 70%. Automatización de flujos de deployment con GitHub Actions y Docker.',
    tags: ['Cypress', 'Jenkins', 'CI/CD', 'Docker'],
  },
  {
    role: 'Full Stack & IA',
    company: 'BulwarkPhone',
    period: '2021 - 2023',
    description:
      'Desarrollo de backend escalable con Laravel e integración de funcionalidades de Inteligencia Artificial para optimización de procesos. Arquitectura de microservicios con AWS.',
    tags: ['Laravel', 'AWS', 'Python', 'IA'],
  },
  {
    role: 'Desarrollador de Software',
    company: 'Red Salud',
    period: '2019 - 2021',
    description:
      'Desarrollo de sistemas de gestión hospitalaria con React y Node.js. Implementación de APIs RESTful y bases de datos en tiempo real.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST'],
  },
]

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-16 border-l-4 border-blue-600 pl-6">
        Trayectoria Profesional
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group relative pl-8 border-l border-gray-800">
            <div
              className={`absolute w-4 h-4 rounded-full -left-[8.5px] top-1 transition-transform group-hover:scale-150 ${
                idx === 0 ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            />
            <h3 className="text-2xl font-bold">
              {exp.role} | {exp.company}
            </h3>
            <p className="text-blue-400 mb-4">{exp.period}</p>
            <p className="text-gray-300 leading-relaxed max-w-3xl mb-4">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-400 rounded text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
