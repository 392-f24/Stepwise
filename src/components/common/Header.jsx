import { useUser } from '@contexts/UserContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmSignOutDialog from './ConfirmSignOutDialog';

const Header = () => {
  const { user, handleSignIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // State for Dialog visibility
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Show back button only on pages other than Home and Streak
  const showBackButton = location.pathname !== '/' && location.pathname !== '/streak';

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.light', color: '#000' }}>
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)} // Back button
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 600,
            fontSize: '1.4rem',
          }}
        >
          Stepwise
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <IconButton edge="end" color="inherit" onClick={() => setOpenConfirmDialog(true)}>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </IconButton>

              {/* Dialog for Confirm Sign Out */}
              <ConfirmSignOutDialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
              />
            </>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
