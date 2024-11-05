import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import LoadingCircle from '@/components/common/LoadingCircle'
import { UserProvider, useUser } from '@/contexts/UserContext'
import Home from '@/pages/Home'
import Streak from '@/pages/Streak'
import { theme } from '@/utils/theme'
import { Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useUser()
  if (loading) {
    return <LoadingCircle />
  }

  return user ? (
    element
  ) : (
    <Typography
      variant='h6'
      sx={{
        textAlign: 'center',
        marginTop: '2rem',
      }}
    >
      Please sign in to view this page
    </Typography>
  )
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className='App'>
          <Router>
            <Header />
            <div className='content'>
              {/* Main content area where pages will render */}
              <Routes>
                <Route
                  path='/'
                  element={<ProtectedRoute element={<Home />} />}
                />
                <Route
                  path='/streak'
                  element={<ProtectedRoute element={<Streak />} />}
                />
              </Routes>
            </div>

            {/* Bottom Navigation with React Router links */}
            <Footer />
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
