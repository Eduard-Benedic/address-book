import { createTheme, Theme } from '@mui/material/styles'
import palette from './palette'

const theme : Theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '35px',
          padding: '1rem 2.6rem',
          textTransform: 'capitalize',
          fontSize: '1.1rem'
        }
      }
    }
  },
  palette
});

export default theme
