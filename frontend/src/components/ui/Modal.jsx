export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="card relative z-10 w-full max-w-md p-6">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-display text-xl text-ink-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-800"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}
