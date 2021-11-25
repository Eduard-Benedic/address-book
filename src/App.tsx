
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import AddressBook from 'components/AddressBook';

function App() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '4rem' }}>
      <CssBaseline />
      <AddressBook />
    </Container>
  );
}

export default App;
