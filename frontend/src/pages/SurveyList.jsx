import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listSurveys } from '../api/surveys'
import SurveyCard from '../components/surveys/SurveyCard.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Alert from '../components/ui/Alert.jsx'

export default function SurveyList() {
  const [surveys, setSurveys] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    listSurveys()
      .then(({ data }) => {
        if (isMounted) setSurveys(Array.isArray(data) ? data : data.results || [])
      })
      .catch(() => {
        if (isMounted) setError('We could not load your surveys right now.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return surveys
    const q = query.toLowerCase()
    return surveys.filter(
      (s) => s.title?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q),
    )
  }, [surveys, query])

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">All expeditions</p>
          <h1 className="mt-1 font-display text-3xl text-ink-800">Surveys</h1>
        </div>
        <Link to="/surveys/new">
          <Button variant="accent">+ New survey</Button>
        </Link>
      </div>

      <Input
        placeholder="Search by title or category…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 max-w-sm"
      />

      {error && <Alert tone="error" className="mb-6">{error}</Alert>}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🗺️"
          title={query ? 'No surveys match your search' : 'No surveys yet'}
          description={query ? 'Try a different keyword.' : 'Create your first survey to get started.'}
          action={
            !query && (
              <Link to="/surveys/new">
                <Button variant="accent">Create a survey</Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      )}
    </div>
  )
}
