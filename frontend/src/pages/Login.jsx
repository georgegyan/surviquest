import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Alert from '../components/ui/Alert.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    const result = await login(form)
    setIsSubmitting(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl text-ink-800">Continue your quest</h1>
      <p className="mt-2 text-sm text-ink-400">Sign in to manage your surveys and see how responses are coming in.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {error && <Alert tone="error">{error}</Alert>}
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="accent" isLoading={isSubmitting} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        New to SurviQuest?{' '}
        <Link to="/register" className="font-semibold text-ink-800 hover:text-compass-600">
          Create an account
        </Link>
      </p>
    </div>
  )
}
