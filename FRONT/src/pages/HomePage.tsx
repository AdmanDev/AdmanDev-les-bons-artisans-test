import React, { useState, useEffect } from 'react'
import { Button, Container, Stack, Typography, Divider } from '@mui/material'
import ProductList from '../components/ProductList'
import { Product } from '../models/Product'
import { ProductService } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'
import SocketService from '../services/SocketService'

function HomePage () {
  const [products, setProducts] = useState<Product[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()

    const unsubProductsUpdate = SocketService.onProductListUpdate(setProducts)

    return () => {
      unsubProductsUpdate()
    }
  }, [])

  const fetchProducts = () => {
    ProductService.getProducts()
      .then(data => {
        if (!data.isError) {
          setProducts(data.value)
        }
      })
  }

  const handleNewProduct = () => {
    navigate('/new')
  }

  return (
    <Container maxWidth='md'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5'>Les produits</Typography>
        <Button variant='contained' onClick={handleNewProduct}>Ajouter</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <ProductList products={products} />
    </Container>
  )
}

export default HomePage
