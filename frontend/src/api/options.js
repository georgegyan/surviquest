import axiosClient from './axiosClient'

export function createOption(payload) {
  // { question, option_text, order }
  return axiosClient.post('/api/questions/options/create/', payload)
}

export function listOptionsForQuestion(questionId) {
  return axiosClient.get(`/api/questions/${questionId}/options/`)
}

export function updateOption(id, payload) {
  return axiosClient.put(`/api/questions/options/${id}/update/`, payload)
}

export function deleteOption(id) {
  return axiosClient.delete(`/api/questions/options/${id}/delete/`)
}
