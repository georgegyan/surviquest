import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createSurvey } from '../api/surveys'
import Input from '../components/ui/Input.jsx'
import Textarea from '../components/ui/Textarea.jsx'
import Button from '../components/ui/Button.jsx'
import Alert from '../components/ui/Alert.jsx'
import Card from '../components/ui/Card.jsx'

const CATEGORIES = ['Customer feedback', 'Product research', 'Event', 'HR & culture', 'Education', 'Other']

export default function CreateSurvey() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', category: '', expires_at: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const { data } = await createSurvey(form)
      navigate(`/surveys/${data.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'We could not create the survey. Check the fields and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Plot a new route</p>
      <h1 className="mt-1 font-display text-3xl text-ink-800">Create a survey</h1>
      <p className="mt-2 text-sm text-ink-400">
        Give it a title and a bit of context — you'll add questions once it's created.
      </p>

      <Card className="mt-8 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert tone="error">{error}</Alert>}
          <Input
            label="Title"
            name="title"
            placeholder="Q3 customer satisfaction check-in"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="What is this survey for, and who should fill it out?"
            value={form.description}
            onChange={handleChange}
          />
          <div>
            <label className="label" htmlFor="category">Category</label>
            <input
              list="category-options"
              id="category"
              name="category"
              className="input"
              placeholder="Choose or type a category"
              value={form.category}
              onChange={handleChange}
            />
            <datalist id="category-options">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <Input
            label="Expires on"
            name="expires_at"
            type="date"
            value={form.expires_at}
            onChange={handleChange}
            hint="Leave blank to keep the survey open indefinitely."
          />

          <div className="mt-2 flex items-center gap-3">
            <Button type="submit" variant="accent" isLoading={isSubmitting}>
              Create survey
            </Button>
            <Link to="/surveys">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
