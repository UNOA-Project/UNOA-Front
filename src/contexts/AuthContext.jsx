import { createContext, useContext, useEffect, useState } from 'react'
import { getUserInfo, logoutUser } from '@/apis/userApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = userData => {
    setUser(userData)
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
    const fetchUser = async () => {
      try {
        const userInfo = await getUserInfo()
        setUser(userInfo)
      } catch {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
