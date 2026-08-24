const TONES = {
  error: 'bg-coral-500/10 text-coral-600 border-coral-500/30',
  success: 'bg-ink-800/5 text-ink-700 border-ink-800/20',
  info: 'bg-compass-100 text-compass-700 border-compass-400/40',
}

export default function Alert({ tone = 'info', children, className = '' }) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm font-medium ${TONES[tone]} ${className}`}>
      {children}
    </div>
  )
}
