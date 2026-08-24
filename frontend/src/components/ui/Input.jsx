export default function Input({ label, error, hint, className = '', id, ...rest }) {
  const inputId = id || rest.name

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input id={inputId} className={`input ${error ? 'border-coral-500 focus:border-coral-500 focus:ring-coral-500' : ''}`} {...rest} />
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-coral-600">{error}</p>}
    </div>
  )
}
