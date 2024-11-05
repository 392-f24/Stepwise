import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description = '', // If null, no description will be shown
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'error', // 'primary' or 'error'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-describedby={
        description ? 'confirmation-dialog-description' : undefined
      }
      role='alertdialog'
    >
      <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id='confirmation-dialog-description'>
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} color={confirmColor} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
