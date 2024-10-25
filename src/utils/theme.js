import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#E4E0EE',
      main: '#4E2A84',
      dark: '#361d5c',
      contractText: '#fff',
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
