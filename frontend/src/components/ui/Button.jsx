const VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${VARIANTS[variant]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
