import React from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material'

interface IProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
}

function ConfirmDialog ({ isOpen, title, message, onConfirm, onClose }: IProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Non</Button>
          <Button onClick={handleConfirm}>Oui</Button>
        </DialogActions>
      </Dialog>
  )
}

export default ConfirmDialog
