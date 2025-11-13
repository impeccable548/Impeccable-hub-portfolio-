import { useState, useEffect } from 'react'
import { auth, ADMIN_CONFIG } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Check authentication status
  const checkAuth = async () => {
    try {
      setLoading(true)
      const { data: session } = await auth.getSession()
      
      if (session) {
        const { data: userData } = await auth.getUser()
        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(userData?.id === ADMIN_CONFIG.uid)
      } else {
        setIsAuthenticated(false)
        setIsAdmin(false)
        setUser(null)
      }
    } catch (err) {
      console.error('Check auth error:', err)
      setIsAuthenticated(false)
      setIsAdmin(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Login with email and password (Supabase auth)
  const login = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signIn(email, password)
      
      if (error) throw error
      
      const isUserAdmin = data.user?.id === ADMIN_CONFIG.uid
      
      setUser(data.user)
      setIsAuthenticated(true)
      setIsAdmin(isUserAdmin)
      
      if (isUserAdmin) {
        toast.success('Welcome back, Providence! 👋')
        return { success: true, error: null }
      } else {
        toast.error('You are not authorized as admin')
        await logout()
        return { success: false, error: 'Not authorized' }
      }
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg = err.message || 'Login failed. Check your credentials.'
      toast.error(errorMsg)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    try {
      await auth.signOut()
      
      setIsAuthenticated(false)
      setIsAdmin(false)
      setUser(null)
      toast.success('Logged out successfully')
      return { error: null }
    } catch (err) {
      console.error('Logout error:', err)
      toast.error('Logout failed')
      return { error: err }
    }
  }

  // Check if admin on mount
  useEffect(() => {
    checkAuth()
  }, [])

  return {
    isAuthenticated,
    isAdmin,
    loading,
    user,
    login,
    logout,
    checkAuth
  }
}

export default useAdmin