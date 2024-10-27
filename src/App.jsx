import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@utils/theme';

import Home from './pages/Home';

import Header from '@components/common/Header';
import './App.css';

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div className="content">
            {/* Main content area where pages will render */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Home />
                  </>
                }
              />
              <Route
                path="/streak"
                element={
                  <>
                    <Header />
                    <Streak />
                  </>
                }
              />
            </Routes>
          </div>

          {/* Bottom Navigation with React Router links */}
          <BottomNavigation
            className="bottom-nav"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction
              label="Steak"
              icon={<FlagIcon />}
              component={Link}
              to="/streak"
            />
          </BottomNavigation>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

const Streak = () => <h1>Streak</h1>;
