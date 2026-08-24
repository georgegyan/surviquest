import { createContext, useCallback, useEffect, useState } from 'react'
import { loginUser, registerUser, fetchProfile } from '../api/auth'
import { setTokens, clearTokens, getAccessToken } from '../api/axiosClient'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProfile = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null)
      setIsLoading(false)
      return
    }
    try {
      const { data } = await fetchProfile()
      setUser(data)
    } catch (err) {
      setUser(null)
      clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const login = useCallback(async ({ email, password }) => {
    setError(null)
    try {
      const { data } = await loginUser({ email, password })
      setTokens({ access: data.access, refresh: data.refresh })
      await loadProfile()
      return { success: true }
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'We could not sign you in with those details.'
      setError(message)
      return { success: false, error: message }
    }
  }, [loadProfile])

  const register = useCallback(async (payload) => {
    setError(null)
    try {
      await registerUser(payload)
      const result = await login({ email: payload.email, password: payload.password })
      return result
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'We could not create your account.'
      setError(message)
      return { success: false, error: message }
    }
  }, [login])

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
