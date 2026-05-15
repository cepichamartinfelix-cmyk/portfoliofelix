export default function TechBadge({ text }) {
  return (
    <span className="px-4 py-1.5 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] text-blue-200 rounded-full text-sm font-mono m-1.5 whitespace-nowrap shadow-[inset_0_0_20px_rgba(59,130,246,0.15),0_0_15px_rgba(59,130,246,0.08)] transition-all duration-300 hover:bg-white/[0.08] hover:border-blue-400/30 hover:shadow-[inset_0_0_25px_rgba(59,130,246,0.25),0_0_20px_rgba(59,130,246,0.12)]">
      {text}
    </span>
  )
}
