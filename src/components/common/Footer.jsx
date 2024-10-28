import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  // Get the index of the page based on the path
  const getPageIndex = (path) => {
    switch (path) {
      case '/':
        return 0;
      case '/streak':
        return 1;
      default:
        return 0;
    }
  };

  return (
    <BottomNavigation
      className="bottom-nav"
      value={getPageIndex(location.pathname)}
      showLabels
      sx={{
        backgroundColor: 'primary.light',
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure the footer is always on top
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Streak" icon={<FlagIcon />} component={Link} to="/streak" />
    </BottomNavigation>
  );
}
