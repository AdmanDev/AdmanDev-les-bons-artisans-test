import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header'
import HomePage from '../../pages/HomePage'
import NewProductPage from '../../pages/NewProductPage'
import EditProductPage from '../../pages/EditProductPage'
import LoginPage from '../../pages/LoginPage'
import ProtectedRoute from './ProtectedRoute'

function Navigator () {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='new' element={<ProtectedRoute><NewProductPage /></ProtectedRoute>} />
        <Route path='edit/:id' element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
      </Routes>
    </React.Fragment>
  )
}

export default Navigator
