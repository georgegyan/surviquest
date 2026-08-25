import { Link } from 'react-router-dom'
import Badge from '../ui/Badge.jsx'
import { formatDate, surveyStatus } from '../../utils/formatters'

export default function SurveyCard({ survey }) {
  const status = surveyStatus(survey)
  const tone = status === 'expired' ? 'expired' : status === 'live' ? 'live' : 'draft'

  return (
    <Link
      to={`/surveys/${survey.id}`}
      className="card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug text-ink-800 group-hover:text-compass-600">
          {survey.title}
        </h3>
        <Badge tone={tone}>{status === 'live' ? 'Live' : status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      </div>
      {survey.description && (
        <p className="line-clamp-2 text-sm text-ink-400">{survey.description}</p>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400">
        <span className="font-mono uppercase tracking-wide">{survey.category || 'Uncategorized'}</span>
        <span>Expires {formatDate(survey.expires_at)}</span>
      </div>
    </Link>
  )
}
