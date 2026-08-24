import axios from 'axios'

// Set VITE_API_BASE_URL in your .env file to point at the SurviQuest backend.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const TOKEN_KEYS = {
  access: 'surviquest_access_token',
  refresh: 'surviquest_refresh_token',
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEYS.access)
}

export function getRefreshToken() {
  return localStorage.getItem(TOKEN_KEYS.refresh)
}

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(TOKEN_KEYS.access, access)
  if (refresh) localStorage.setItem(TOKEN_KEYS.refresh, refresh)
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEYS.access)
  localStorage.removeItem(TOKEN_KEYS.refresh)
}

// Attach the access token to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On a 401, try to refresh the access token once, then retry the request.
// If the refresh fails, clear tokens and force a redirect to /login.
let isRefreshing = false
let pendingQueue = []

function resolveQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  pendingQueue = []
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    const isAuthEndpoint =
      originalRequest?.url?.includes('/api/auth/login') ||
      originalRequest?.url?.includes('/api/auth/register') ||
      originalRequest?.url?.includes('/api/auth/refresh')

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh/`, {
          refresh: refreshToken,
        })
        setTokens({ access: data.access, refresh: data.refresh })
        resolveQueue(null, data.access)
        originalRequest.headers.Authorization = `Bearer ${data.access}`
        return axiosClient(originalRequest)
      } catch (refreshError) {
        resolveQueue(refreshError, null)
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
