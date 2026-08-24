import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSurvey, updateSurvey, deleteSurvey } from '../api/surveys'
import { exportSurveyCsv, exportSurveyExcel } from '../api/exports'
import Input from '../components/ui/Input.jsx'
import Textarea from '../components/ui/Textarea.jsx'
import Button from '../components/ui/Button.jsx'
import Alert from '../components/ui/Alert.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Modal from '../components/ui/Modal.jsx'
import { formatDate, getPublicSurveyUrl, surveyStatus } from '../utils/formatters'

export default function EditSurvey() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState(null)
  const [form, setForm] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let isMounted = true
    getSurvey(id)
      .then(({ data }) => {
        if (!isMounted) return
        setSurvey(data)
        setForm({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          expires_at: data.expires_at ? data.expires_at.slice(0, 10) : '',
        })
      })
      .catch(() => isMounted && setError('We could not load this survey.'))
      .finally(() => isMounted && setIsLoading(false))
    return () => {
      isMounted = false
    }
  }, [id])

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setNotice('')
    setIsSaving(true)
    try {
      const { data } = await updateSurvey(id, form)
      setSurvey(data)
      setNotice('Changes saved.')
    } catch (err) {
      setError(err.response?.data?.detail || 'We could not save your changes.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteSurvey(id)
      navigate('/surveys')
    } catch (err) {
      setError('We could not delete this survey.')
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  async function handleExport(type) {
    setIsExporting(type)
    try {
      if (type === 'csv') await exportSurveyCsv(id)
      else await exportSurveyExcel(id)
    } catch (err) {
      setError('The export could not be generated. Try again in a moment.')
    } finally {
      setIsExporting('')
    }
  }

  function handleCopyLink() {
    if (!survey?.slug) return
    navigator.clipboard.writeText(getPublicSurveyUrl(survey.slug))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!survey) {
    return <Alert tone="error">{error || 'Survey not found.'}</Alert>
  }

  const status = surveyStatus(survey)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Survey</p>
            <Badge tone={status === 'expired' ? 'expired' : 'live'}>{status === 'expired' ? 'Expired' : 'Live'}</Badge>
          </div>
          <h1 className="mt-1 font-display text-3xl text-ink-800">{survey.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/surveys/${id}/questions`}>
            <Button variant="ghost">Question builder</Button>
          </Link>
          <Link to={`/surveys/${id}/analytics`}>
            <Button variant="accent">View analytics</Button>
          </Link>
        </div>
      </div>

      {error && <Alert tone="error" className="mb-6">{error}</Alert>}
      {notice && <Alert tone="success" className="mb-6">{notice}</Alert>}

      {survey.slug && (
        <Card className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Public link</p>
            <p className="truncate font-mono text-sm text-ink-700">{getPublicSurveyUrl(survey.slug)}</p>
          </div>
          <Button variant="ghost" onClick={handleCopyLink}>
            {copied ? 'Copied ✓' : 'Copy link'}
          </Button>
        </Card>
      )}

      <Card className="p-6">
        <h2 className="mb-4 font-display text-lg text-ink-800">Survey details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} />
          <Input
            label="Expires on"
            name="expires_at"
            type="date"
            value={form.expires_at}
            onChange={handleChange}
          />
          <div className="mt-2 flex items-center gap-3">
            <Button type="submit" variant="accent" isLoading={isSaving}>
              Save changes
            </Button>
            <span className="text-xs text-ink-400">Created {formatDate(survey.created_at)}</span>
          </div>
        </form>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="mb-1 font-display text-lg text-ink-800">Export responses</h2>
        <p className="mb-4 text-sm text-ink-400">Download every response collected so far.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" isLoading={isExporting === 'csv'} onClick={() => handleExport('csv')}>
            ⬇ Export CSV
          </Button>
          <Button variant="ghost" isLoading={isExporting === 'excel'} onClick={() => handleExport('excel')}>
            ⬇ Export Excel
          </Button>
        </div>
      </Card>

      <Card className="mt-6 border-coral-500/30 p-6">
        <h2 className="mb-1 font-display text-lg text-coral-600">Danger zone</h2>
        <p className="mb-4 text-sm text-ink-400">Deleting a survey removes its questions and responses permanently.</p>
        <Button variant="danger" onClick={() => setConfirmDelete(true)}>
          Delete survey
        </Button>
      </Card>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this survey?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>Delete permanently</Button>
          </>
        }
      >
        <p className="text-sm text-ink-500">
          This will permanently delete “{survey.title}”, along with its questions and any collected responses. This cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
