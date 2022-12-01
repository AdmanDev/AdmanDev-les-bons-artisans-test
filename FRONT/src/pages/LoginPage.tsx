import React, { useState } from 'react'
import { Button, Container, Paper, Divider, Typography, TextField } from '@mui/material'
import { AuthService } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/Provider/AuthProvider'

function LoginPage () {
  const [email, setEmail] = useState('')
  const [psw, setPsw] = useState('')

  const navigate = useNavigate()

  const { setIsLogged } = useAuth()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePswChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsw(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    AuthService.login(email, psw)
      .then(data => {
        if (!data.isError) {
          setIsLogged(true)
          navigate('/')
        }
      })
  }

  return (
    <Container maxWidth='xs'>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h5'>Connexion</Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            type='email'
            name='email'
            label='Votre email...'
            value={email}
            margin='normal'
            autoFocus
            required
            fullWidth
            onChange={handleEmailChange}
          />
          <TextField
            type='password'
            name='psw'
            label='Votre mot de passe...'
            value={psw}
            margin='normal'
            required
            fullWidth
            onChange={handlePswChange}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 2 }}
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginPage
