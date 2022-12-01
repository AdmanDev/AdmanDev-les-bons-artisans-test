import React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsLogged } from '../Provider/AuthProvider'

interface IProps {
  children: React.ReactElement;
}

function ProtectedRoute ({ children }: IProps) {
  const isUserLogged = useIsLogged()

  if (!isUserLogged) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
