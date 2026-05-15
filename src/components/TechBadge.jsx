export default function TechBadge({ text }) {
  return (
    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-full text-sm font-mono m-1 whitespace-nowrap">
      {text}
    </span>
  )
}
