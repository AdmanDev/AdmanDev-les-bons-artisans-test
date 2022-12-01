import React from 'react'
import { Container, Stack, Divider, Paper, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductForm from '../components/ProductForm'
import { Product } from '../models/Product'
import { ProductService } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'

function NewProductPage () {
  const navigate = useNavigate()

  const handleSubmit = (product: Product) => {
    ProductService.addProduct(product).then(handleGoBack)
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 2 }}>
        <Stack direction='row' spacing={2}>
          <IconButton onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h5'>Ajouter un produit</Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <ProductForm onSubmit={handleSubmit} />
      </Paper>
    </Container>
  )
}

export default NewProductPage
