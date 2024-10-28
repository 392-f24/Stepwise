import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@utils/theme';

import Home from '@pages/Home';
import Streak from '@pages/Streak';

import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import { UserProvider } from '@contexts/UserContext';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="App">
          <Router>
            <Header />
            <div className="content">
              {/* Main content area where pages will render */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/streak" element={<Streak />} />
              </Routes>
            </div>

            {/* Bottom Navigation with React Router links */}
            <Footer />
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
