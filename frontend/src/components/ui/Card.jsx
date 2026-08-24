export default function Card({ children, className = '', as: Component = 'div', ...rest }) {
  return (
    <Component className={`card ${className}`} {...rest}>
      {children}
    </Component>
  )
}
