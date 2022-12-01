import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment, FormControlLabel, Checkbox, Button } from '@mui/material'
import { Product } from '../models/Product'

interface IProps {
  onSubmit: (product: Product) => void
  initialProduct?: Product
}

function ProductForm ({ onSubmit, initialProduct }: IProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0)
  const [warrantyYears, setWarrantyYears] = useState(0)
  const [available, setAvailable] = useState(true)

  const priceInputRef = React.createRef<HTMLInputElement>()

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setType(initialProduct.type)
      setPrice(initialProduct.price)
      setWarrantyYears(initialProduct.warranty_years)
      setAvailable(initialProduct.available)

      if (priceInputRef.current) {
        priceInputRef.current.value = initialProduct.price.toString()
      }
    }
  }, [initialProduct, priceInputRef.current])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  const handlePriceChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(parseFloat(e.target.value).toFixed(2))
    setPrice(value)
    e.target.value = value.toString()
  }

  const handleWarrantyYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarrantyYears(parseInt(e.target.value))
  }

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailable(e.target.checked)
  }

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault()

    const product: Product = {
      _id: 'id',
      rating: 0,
      warranty_years: warrantyYears,
      name,
      price,
      available,
      type
    }

    onSubmit(product)
  }

  return (
    <form onSubmit={handleValidate}>
      <TextField
        name='name'
        label='Nom du produit...'
        value={name}
        margin='normal'
        autoFocus
        required
        fullWidth
        onChange={handleNameChange}
      />
      <TextField
        name='type'
        label='Type du produit...'
        value={type}
        margin='normal'
        required
        fullWidth
        onChange={handleTypeChange}
      />
      <TextField
        type="number"
        name='price'
        label='Prix du produit...'
        defaultValue={price}
        margin='normal'
        inputProps={{
          min: 0,
          step: 0.01,
          ref: priceInputRef,
          onBlur: handlePriceChange
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>
        }}
        required
        fullWidth
      />
      <TextField
        type="number"
        name='warranty_years'
        label='Durée de la garantie (en année)...'
        value={warrantyYears}
        margin='normal'
        inputProps={{ min: 0 }}
        required
        fullWidth
        onChange={handleWarrantyYearsChange}
      />
      <FormControlLabel
        control={<Checkbox name='available' value={available} onChange={handleAvailableChange} />}
        label="Disponible"
      />
      <Button
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 2 }}
      >
        Valider
      </Button>
    </form>
  )
}

export default ProductForm
