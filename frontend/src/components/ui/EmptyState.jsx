export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="trail-path flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-200 bg-paper-50/60 px-6 py-16 text-center">
      {icon && <div className="text-4xl">{icon}</div>}
      <h3 className="font-display text-xl text-ink-800">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
