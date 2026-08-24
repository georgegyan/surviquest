import axiosClient from './axiosClient'

export function getSurveyAnalytics(surveyId) {
  return axiosClient.get(`/api/surveys/${surveyId}/analytics/`)
}
