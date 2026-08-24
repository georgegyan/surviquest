import axiosClient from './axiosClient'

export const QUESTION_TYPES = [
  { value: 'short_text', label: 'Short text' },
  { value: 'long_text', label: 'Long text' },
  { value: 'multiple_choice', label: 'Multiple choice' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'rating', label: 'Rating' },
  { value: 'yes_no', label: 'Yes / No' },
]

export function createQuestion(payload) {
  // { survey, question_text, question_type, is_required, order }
  return axiosClient.post('/api/questions/create/', payload)
}

export function listQuestionsForSurvey(surveyId) {
  return axiosClient.get(`/api/questions/survey/${surveyId}/`)
}

export function updateQuestion(id, payload) {
  return axiosClient.put(`/api/questions/${id}/update/`, payload)
}

export function deleteQuestion(id) {
  return axiosClient.delete(`/api/questions/${id}/delete/`)
}
