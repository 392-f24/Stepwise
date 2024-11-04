import ConfirmationDialog from '@components/common/ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

const DeleteItem = ({ deleteFunction, goalIndex, microGoalIndex, taskIndex }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteFunction({ goalIndex, microGoalIndex, taskIndex });
    setIsDialogOpen(false); // Close the dialog after deletion
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => setIsDialogOpen(true)}
          sx={{ color: 'error.main' }} // Set color to indicate delete action
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this item?"
        confirmText="Delete"
      />
    </>
  );
};

export default DeleteItem;
