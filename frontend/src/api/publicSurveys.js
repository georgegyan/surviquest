import axiosClient from './axiosClient'

export function getPublicSurvey(slug) {
  return axiosClient.get(`/api/public/surveys/${slug}/`)
}

export function submitSurveyResponse(slug, answers) {
  // answers: [{ question_id, answer }]
  return axiosClient.post(`/api/public/surveys/${slug}/submit/`, { answers })
}
