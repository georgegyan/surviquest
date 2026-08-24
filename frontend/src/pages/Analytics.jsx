import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSurvey } from '../api/surveys'
import { getSurveyAnalytics } from '../api/analytics'
import { exportSurveyCsv, exportSurveyExcel } from '../api/exports'
import StatCard from '../components/ui/StatCard.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Alert from '../components/ui/Alert.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ResponsesLineChart from '../components/charts/ResponsesLineChart.jsx'
import QuestionBarChart from '../components/charts/QuestionBarChart.jsx'
import OptionsPieChart from '../components/charts/OptionsPieChart.jsx'
import { formatPercent } from '../utils/formatters'

// The backend's exact analytics shape may vary; normalize a few
// reasonable field-name variants into what the charts expect.
function normalizeSeries(raw, keyCandidates, valueCandidates) {
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
    const keyField = keyCandidates.find((k) => item[k] !== undefined)
    const valueField = valueCandidates.find((k) => item[k] !== undefined)
    return {
      label: keyField ? item[keyField] : Object.values(item)[0],
      date: keyField ? item[keyField] : Object.values(item)[0],
      value: valueField ? item[valueField] : 0,
      count: valueField ? item[valueField] : 0,
    }
  })
}

export default function Analytics() {
  const { id } = useParams()
  const [survey, setSurvey] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isExporting, setIsExporting] = useState('')

  useEffect(() => {
    let isMounted = true
    Promise.all([getSurvey(id), getSurveyAnalytics(id)])
      .then(([surveyRes, analyticsRes]) => {
        if (!isMounted) return
        setSurvey(surveyRes.data)
        setAnalytics(analyticsRes.data)
      })
      .catch(() => isMounted && setError('We could not load analytics for this survey yet.'))
      .finally(() => isMounted && setIsLoading(false))
    return () => {
      isMounted = false
    }
  }, [id])

  async function handleExport(type) {
    setIsExporting(type)
    try {
      if (type === 'csv') await exportSurveyCsv(id)
      else await exportSurveyExcel(id)
    } finally {
      setIsExporting('')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <Alert tone="error">{error}</Alert>
  }

  const responsesPerDay = normalizeSeries(analytics.responses_per_day, ['date', 'day', 'label'], ['count', 'value', 'total'])
  const questionBreakdown = normalizeSeries(
    analytics.question_breakdown,
    ['question_text', 'question', 'label'],
    ['response_count', 'count', 'value'],
  )
  const ratingSummary = normalizeSeries(analytics.rating_summary, ['rating', 'label'], ['count', 'value'])
  const optionStatistics = normalizeSeries(
    analytics.option_statistics,
    ['option_text', 'option', 'label'],
    ['count', 'value'],
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Analytics</p>
          <h1 className="mt-1 font-display text-3xl text-ink-800">{survey?.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/surveys/${id}`}>
            <Button variant="ghost">← Back to survey</Button>
          </Link>
          <Button variant="ghost" isLoading={isExporting === 'csv'} onClick={() => handleExport('csv')}>
            ⬇ CSV
          </Button>
          <Button variant="accent" isLoading={isExporting === 'excel'} onClick={() => handleExport('excel')}>
            ⬇ Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Total responses" value={analytics.total_responses ?? 0} icon="📬" accent />
        <StatCard label="Completion rate" value={formatPercent(analytics.completion_rate)} icon="🎯" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-display text-lg text-ink-800">Responses over time</h2>
          {responsesPerDay.length === 0 ? (
            <EmptyState icon="📈" title="No responses yet" description="This chart fills in as responses arrive." />
          ) : (
            <ResponsesLineChart data={responsesPerDay} />
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-display text-lg text-ink-800">Responses per question</h2>
          {questionBreakdown.length === 0 ? (
            <EmptyState icon="📊" title="No breakdown yet" description="Question-level stats will appear here." />
          ) : (
            <QuestionBarChart data={questionBreakdown} />
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-display text-lg text-ink-800">Rating distribution</h2>
          {ratingSummary.length === 0 ? (
            <EmptyState icon="⭐" title="No ratings yet" description="Rating-question results will appear here." />
          ) : (
            <OptionsPieChart data={ratingSummary} />
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-display text-lg text-ink-800">Choice option breakdown</h2>
          {optionStatistics.length === 0 ? (
            <EmptyState icon="🥧" title="No choices yet" description="Multiple-choice results will appear here." />
          ) : (
            <OptionsPieChart data={optionStatistics} />
          )}
        </Card>
      </div>
    </div>
  )
}
