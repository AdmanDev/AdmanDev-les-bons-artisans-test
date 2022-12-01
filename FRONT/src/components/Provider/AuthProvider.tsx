import React, { useState } from 'react'

interface IProps {
  children: React.ReactNode
}

interface AuthContextType {
  isLogged: boolean,
  setIsLogged: (value: boolean) => void
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider ({ children }: IProps) {
  const [isLogged, setIsLogged] = useState(false)

  const handleSetIsLogged = (value: boolean) => {
    setIsLogged(value)
  }

  const value = {
    isLogged,
    setIsLogged: handleSetIsLogged
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return React.useContext(AuthContext)
}

export function useIsLogged () {
  const auth = useAuth()
  return auth.isLogged
}
