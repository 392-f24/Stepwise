import { useUser } from '@contexts/UserContext';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ConfirmSignOutDialog = ({ open, onClose }) => {
  const { handleSignOut } = useUser();

  // Function to confirm sign out
  const confirmSignOut = async () => {
    await handleSignOut();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Sign Out</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={confirmSignOut} color="error">
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSignOutDialog;
