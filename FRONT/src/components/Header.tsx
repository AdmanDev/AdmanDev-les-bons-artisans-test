import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

function Header () {
  return (
    <AppBar position='relative' sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant='h5'>Les bons artisans</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
