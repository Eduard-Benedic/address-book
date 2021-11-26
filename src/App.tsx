import { ThemeProvider } from '@mui/material'
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import AddressBook from 'components/features/AddressBook/AddressBook'
import theme from './theme/index'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: (theme) => theme.spacing(8),
          paddingBottom: (theme) => theme.spacing(8)
        }}
      >
        <CssBaseline />
        <AddressBook />
      </Container>
    </ThemeProvider>
  );
}

export default App;
