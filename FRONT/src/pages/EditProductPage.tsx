import React, { useState, useEffect } from 'react'
import { Container, Stack, Divider, Paper, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductForm from '../components/ProductForm'
import { Product } from '../models/Product'
import { ProductService } from '../services/ProductService'
import { useNavigate, useParams } from 'react-router-dom'

function EditProductPage () {
  const [productToEdit, setProductToEdit] = useState<Product>()

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      ProductService.getOneProduct(id)
        .then(data => {
          if (!data.isError) {
            setProductToEdit(data.value)
          }
        })
    }
  }, [id])

  const handleSubmit = (product: Product) => {
    if (id) {
      ProductService.editProduct(id, product).then(handleGoBack)
    }
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
          <Typography variant='h5'>Modifier un produit</Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <ProductForm onSubmit={handleSubmit} initialProduct={productToEdit} />
      </Paper>
    </Container>
  )
}

export default EditProductPage
