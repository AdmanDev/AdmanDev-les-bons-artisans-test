import React, { useState } from 'react'
import { Paper, Stack, Typography, IconButton, Rating } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Product } from '../models/Product'
import ConfirmDialog from './ConfirmDialog'
import { ProductService } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'

interface IProps {
  item: Product
}

function ProductItem ({ item }: IProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const navigate = useNavigate()

  const handleEditProduct = () => {
    navigate(`/edit/${item._id}`)
  }

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen(value => !value)
  }

  const handleDeleteProduct = () => {
    ProductService.deleteProduct(item._id)
  }

  const getInfo = (title: string, info: string) => (
    <Stack alignItems="center">
      <Typography color='graytext'>{title}</Typography>
      <Typography>{info}</Typography>
    </Stack>
  )

  return (
    <Paper sx={{ pl: 4, py: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant='h6'>{item.name}</Typography>
        <Rating name="Score" value={item.rating} precision={0.5} readOnly />
        <Stack direction="row">
          <IconButton color='primary' onClick={handleEditProduct}>
            <EditIcon />
          </IconButton>
          <IconButton color='primary' onClick={toggleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-evenly">
        {getInfo('Type', item.type)}
        {getInfo('Garantie', `${item.warranty_years} an(s)`)}
        {getInfo('Stock', item.available ? 'Disponible' : 'Rupture de stock')}
        {getInfo('Prix', `${item.price} €`)}
      </Stack>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title={`Suppression du produit : "${item.name}"`}
        message='Êtes-vous sûr de vouloir supprimer ce produit ?'
        onConfirm={handleDeleteProduct}
        onClose={toggleDeleteDialog}
      />
    </Paper>
  )
}

export default ProductItem
