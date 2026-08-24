export default function Textarea({ label, error, hint, className = '', id, rows = 4, ...rest }) {
  const inputId = id || rest.name

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <textarea id={inputId} rows={rows} className={`input resize-none ${error ? 'border-coral-500 focus:border-coral-500 focus:ring-coral-500' : ''}`} {...rest} />
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-coral-600">{error}</p>}
    </div>
  )
}
