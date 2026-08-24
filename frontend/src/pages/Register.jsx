import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Alert from '../components/ui/Alert.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    const result = await register(form)
    setIsSubmitting(false)
    if (result.success) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Get started</p>
      <h1 className="mt-2 font-display text-3xl text-ink-800">Set out on SurviQuest</h1>
      <p className="mt-2 text-sm text-ink-400">Create an account to start building and sharing surveys.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {error && <Alert tone="error">{error}</Alert>}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First name"
            name="first_name"
            placeholder="Ada"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Last name"
            name="last_name"
            placeholder="Lovelace"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
        />
        <Button type="submit" variant="accent" isLoading={isSubmitting} className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-ink-800 hover:text-compass-600">
          Sign in
        </Link>
      </p>
    </div>
  )
}
