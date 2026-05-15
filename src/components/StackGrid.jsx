const categories = [
  {
    title: 'Automatización',
    items: ['Cypress', 'Playwright', 'Selenium', 'Jenkins', 'GitHub Actions'],
    color: 'blue',
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux'],
    color: 'cyan',
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Python', 'Laravel', 'PostgreSQL', 'MongoDB'],
    color: 'purple',
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'TypeScript'],
    color: 'green',
  },
]

const colorMap = {
  blue: 'from-blue-600 to-blue-800 border-blue-500/30 text-blue-300',
  cyan: 'from-cyan-600 to-cyan-800 border-cyan-500/30 text-cyan-300',
  purple: 'from-purple-600 to-purple-800 border-purple-500/30 text-purple-300',
  green: 'from-emerald-600 to-emerald-800 border-emerald-500/30 text-emerald-300',
}

export default function StackGrid() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-16 border-l-4 border-blue-600 pl-6">
        Stack Técnico
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className={`rounded-xl border bg-gradient-to-br ${colorMap[cat.color]} p-6 backdrop-blur-sm`}
          >
            <h3 className="text-lg font-bold mb-4 tracking-wide">{cat.title}</h3>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
