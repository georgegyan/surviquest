const TONES = {
  live: 'bg-ink-800 text-paper-50',
  draft: 'bg-ink-100 text-ink-500',
  expired: 'bg-coral-500/10 text-coral-600',
  neutral: 'bg-compass-100 text-compass-700',
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  )
}
