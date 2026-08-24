import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listSurveys } from '../api/surveys'
import { useAuth } from '../hooks/useAuth'
import StatCard from '../components/ui/StatCard.jsx'
import SurveyCard from '../components/surveys/SurveyCard.jsx'
import Button from '../components/ui/Button.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Alert from '../components/ui/Alert.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [surveys, setSurveys] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
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

  const totalResponses = useMemo(
    () => surveys.reduce((sum, survey) => sum + (survey.response_count ?? survey.total_responses ?? 0), 0),
    [surveys],
  )

  const recentSurveys = useMemo(
    () =>
      [...surveys]
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 4),
    [surveys],
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Basecamp</p>
          <h1 className="mt-1 font-display text-3xl text-ink-800">
            Welcome back{user?.first_name ? `, ${user.first_name}` : ''}
          </h1>
        </div>
        <Link to="/surveys/new">
          <Button variant="accent">+ New survey</Button>
        </Link>
      </div>

      {error && <Alert tone="error" className="mb-6">{error}</Alert>}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total surveys" value={surveys.length} icon="🗺️" accent />
            <StatCard label="Total responses" value={totalResponses} icon="📬" />
            <StatCard
              label="Live now"
              value={surveys.filter((s) => !s.expires_at || new Date(s.expires_at) > new Date()).length}
              icon="🏕️"
            />
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-ink-800">Recent surveys</h2>
              <Link to="/surveys" className="text-sm font-semibold text-compass-600 hover:text-compass-700">
                View all →
              </Link>
            </div>

            {recentSurveys.length === 0 ? (
              <EmptyState
                icon="🧭"
                title="No expeditions logged yet"
                description="Create your first survey to start collecting responses."
                action={
                  <Link to="/surveys/new">
                    <Button variant="accent">Create a survey</Button>
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentSurveys.map((survey) => (
                  <SurveyCard key={survey.id} survey={survey} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
