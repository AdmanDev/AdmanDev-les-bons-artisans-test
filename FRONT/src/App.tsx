import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigator from './components/Navigator/Navigator'
import { AuthProvider } from './components/Provider/AuthProvider'
import SocketService from './services/SocketService'

function App () {
  SocketService.connect()

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
