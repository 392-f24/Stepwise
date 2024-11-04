import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

const DeleteItem = ({ deleteFunction, goalIndex, microGoalIndex, taskIndex }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true); // Open the confirmation modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal without deleting
  };

  const handleConfirmDelete = async () => {
    await deleteFunction({ goalIndex, microGoalIndex, taskIndex });
    setOpen(false); // Close the modal after deletion
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleOpen}
          sx={{ color: 'error.main' }} // Set color to indicate delete action
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Confirmation Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteItem;
