import { ThemeProvider } from '@mui/material'
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import AddressBookTable from 'components/AddressBookTable';
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
        <AddressBookTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
