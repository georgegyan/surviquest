export default function Select({ label, error, hint, className = '', id, children, ...rest }) {
  const inputId = id || rest.name

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <select id={inputId} className={`input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23152A2E"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10 ${error ? 'border-coral-500' : ''}`} {...rest}>
        {children}
      </select>
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-coral-600">{error}</p>}
    </div>
  )
}
