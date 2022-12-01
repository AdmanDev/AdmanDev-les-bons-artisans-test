import React from 'react'
import { Stack } from '@mui/material'
import ProductItem from './ProductItem'
import { Product } from '../models/Product'

interface IProps {
  products: Product[]
}

function ProductList ({ products }: IProps) {
  return (
    <Stack spacing={3}>
      {
        products.map(item => (
          <ProductItem key={item._id} item={item} />
        ))
      }
    </Stack>
  )
}

export default ProductList
