import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'shopit_users'
const CURRENT_USER_KEY = 'shopit_current_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [user])

  function signup({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const match = users.find(
      (item) => item.email === normalizedEmail && item.password === password,
    )

    if (!match) {
      throw new Error('Invalid email or password.')
    }

    setUser({ id: match.id, name: match.name, email: match.email })
  }

  function logout() {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
