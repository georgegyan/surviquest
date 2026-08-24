import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPublicSurvey, submitSurveyResponse } from '../api/publicSurveys'
import Button from '../components/ui/Button.jsx'
import Textarea from '../components/ui/Textarea.jsx'
import Alert from '../components/ui/Alert.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Card from '../components/ui/Card.jsx'

function QuestionField({ question, value, onChange }) {
  const options = question.options || []

  switch (question.question_type) {
    case 'long_text':
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={question.is_required}
          placeholder="Type your answer…"
        />
      )
    case 'multiple_choice':
    case 'yes_no': {
      const choices = question.question_type === 'yes_no' ? [{ id: 'yes', option_text: 'Yes' }, { id: 'no', option_text: 'No' }] : options
      return (
        <div className="flex flex-col gap-2">
          {choices.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                value === opt.option_text ? 'border-compass-500 bg-compass-50' : 'border-ink-200 hover:bg-ink-50'
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                className="h-4 w-4 text-compass-500 focus:ring-compass-500"
                checked={value === opt.option_text}
                onChange={() => onChange(opt.option_text)}
                required={question.is_required}
              />
              {opt.option_text}
            </label>
          ))}
        </div>
      )
    }
    case 'checkbox': {
      const selected = Array.isArray(value) ? value : []
      return (
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                selected.includes(opt.option_text) ? 'border-compass-500 bg-compass-50' : 'border-ink-200 hover:bg-ink-50'
              }`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded text-compass-500 focus:ring-compass-500"
                checked={selected.includes(opt.option_text)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selected, opt.option_text]
                    : selected.filter((v) => v !== opt.option_text)
                  onChange(next)
                }}
              />
              {opt.option_text}
            </label>
          ))}
        </div>
      )
    }
    case 'dropdown':
      return (
        <select
          className="input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={question.is_required}
        >
          <option value="" disabled>Choose an option…</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.option_text}>
              {opt.option_text}
            </option>
          ))}
        </select>
      )
    case 'rating':
      return (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => onChange(n)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border font-display text-sm font-semibold transition-colors ${
                Number(value) === n
                  ? 'border-compass-500 bg-compass-500 text-ink-900'
                  : 'border-ink-200 text-ink-500 hover:bg-ink-50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )
    case 'short_text':
    default:
      return (
        <input
          className="input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={question.is_required}
          placeholder="Type your answer…"
        />
      )
  }
}

export default function PublicSurvey() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState(null)
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    getPublicSurvey(slug)
      .then(({ data }) => isMounted && setSurvey(data))
      .catch(() => isMounted && setError('This survey is unavailable or has expired.'))
      .finally(() => isMounted && setIsLoading(false))
    return () => {
      isMounted = false
    }
  }, [slug])

  function setAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const payload = (survey.questions || []).map((q) => ({
        question_id: q.id,
        answer: answers[q.id] ?? '',
      }))
      await submitSurveyResponse(slug, payload)
      navigate(`/s/${slug}/thank-you`)
    } catch (err) {
      setError(err.response?.data?.detail || 'We could not submit your response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error && !survey) {
    return (
      <div className="mx-auto max-w-lg">
        <Alert tone="error">{error}</Alert>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">You're invited</p>
      <h1 className="mt-1 font-display text-3xl text-ink-800">{survey.title}</h1>
      {survey.description && <p className="mt-2 text-sm text-ink-400">{survey.description}</p>}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        {error && <Alert tone="error">{error}</Alert>}
        {(survey.questions || []).map((question, index) => (
          <Card key={question.id} className="p-5">
            <label className="mb-3 block font-display text-base text-ink-800">
              <span className="mr-2 text-compass-600">{index + 1}.</span>
              {question.question_text}
              {question.is_required && <span className="ml-1 text-coral-500">*</span>}
            </label>
            <QuestionField
              question={question}
              value={answers[question.id]}
              onChange={(value) => setAnswer(question.id, value)}
            />
          </Card>
        ))}

        <Button type="submit" variant="accent" isLoading={isSubmitting} className="w-full">
          Submit response
        </Button>
      </form>
    </div>
  )
}
