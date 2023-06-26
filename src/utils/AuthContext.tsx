import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextProps {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context == null) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ isAuthenticated: boolean, children: React.ReactNode }> = ({
  isAuthenticated: initialIsAuthenticated,
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated)
  useEffect(() => {
    console.log('isAuthenticated123:', isAuthenticated)
  }, [isAuthenticated])
  const setAuthenticated = (value: boolean): void => {
    console.log('el value', value)
    setIsAuthenticated(value)
    console.log('12345', isAuthenticated)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
