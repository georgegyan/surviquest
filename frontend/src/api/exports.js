import axiosClient, { BASE_URL, getAccessToken } from './axiosClient'

// These endpoints return file streams, so we fetch them as blobs and
// trigger a browser download rather than routing them through JSON parsing.
async function downloadFile(path, filename) {
  const response = await axiosClient.get(path, { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

export function exportSurveyCsv(surveyId) {
  return downloadFile(`/api/surveys/${surveyId}/export/csv/`, `survey-${surveyId}-responses.csv`)
}

export function exportSurveyExcel(surveyId) {
  return downloadFile(`/api/surveys/${surveyId}/export/excel/`, `survey-${surveyId}-responses.xlsx`)
}

// Exposed for cases where a caller wants the raw URL instead (e.g. opening in a new tab).
export function getExportUrl(surveyId, type) {
  const token = getAccessToken()
  return `${BASE_URL}/api/surveys/${surveyId}/export/${type}/?token=${token}`
}
