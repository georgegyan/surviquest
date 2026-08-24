import axiosClient from './axiosClient'

export function registerUser(payload) {
  // payload: { email, password, first_name, last_name }
  return axiosClient.post('/api/auth/register/', payload)
}

export function loginUser(payload) {
  // payload: { email, password } -> { access, refresh }
  return axiosClient.post('/api/auth/login/', payload)
}

export function refreshAccessToken(refresh) {
  return axiosClient.post('/api/auth/refresh/', { refresh })
}

export function fetchProfile() {
  return axiosClient.get('/api/auth/profile/')
}
