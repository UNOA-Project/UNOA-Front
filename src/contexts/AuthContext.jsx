import { createContext, useContext, useEffect, useState } from 'react'
import { getUserInfo, logoutUser } from '@/apis/userApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  const login = async () => {
    try {
      const userInfo = await getUserInfo()
      setUser(userInfo)
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (err) {
      console.error('로그아웃 실패', err)
    }
  }

  useEffect(() => {
    login()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
