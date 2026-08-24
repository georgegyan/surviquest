import axiosClient from './axiosClient'

export function createSurvey(payload) {
  // { title, description, category, expires_at }
  return axiosClient.post('/api/surveys/create/', payload)
}

export function listSurveys() {
  return axiosClient.get('/api/surveys/')
}

export function getSurvey(id) {
  return axiosClient.get(`/api/surveys/${id}/`)
}

export function updateSurvey(id, payload) {
  return axiosClient.put(`/api/surveys/${id}/update/`, payload)
}

export function deleteSurvey(id) {
  return axiosClient.delete(`/api/surveys/${id}/delete/`)
}
