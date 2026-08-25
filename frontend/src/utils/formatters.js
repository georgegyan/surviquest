export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatPercent(value) {
  if (value === null || value === undefined) return '0%'
  return `${Math.round(value)}%`
}

export function surveyStatus(survey) {
  if (survey?.status && survey.status !== 'published') return survey.status
  if (!survey?.expires_at) return 'live'
  const expires = new Date(survey.expires_at)
  if (Number.isNaN(expires.getTime())) return 'live'
  return expires.getTime() < Date.now() ? 'expired' : 'live'
}

export function getPublicSurveyUrl(slug) {
  return `${window.location.origin}/s/${slug}`
}
