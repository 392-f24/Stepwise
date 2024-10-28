import { useUser } from '@contexts/UserContext';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

const Header = () => {
  const { user, handleSignIn, handleSignOut } = useUser();

  const handleAuthClick = async () => {
    if (user) {
      await handleSignOut();
    } else {
      await handleSignIn();
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.light', color: '#000' }}>
      <Toolbar sx={{ position: 'relative', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Placeholder Box for back button if needed in the future */}
          <Box sx={{ width: '48px' }} />
        </Box>

        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: '600',
            fontSize: '1.4rem',
          }}
        >
          Stepwise
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <IconButton edge="end" color="inherit" onClick={handleAuthClick}>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleAuthClick}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
