import axios from 'axios'
import { BASE_URL } from './axiosClient'

const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getPublicSurvey(slug) {
  return publicClient.get(`/api/public/surveys/${slug}/`)
}

export function submitSurveyResponse(slug, answers) {
  // answers: [{ question_id, answer }]
  return publicClient.post(`/api/public/surveys/${slug}/submit/`, { answers })
}
