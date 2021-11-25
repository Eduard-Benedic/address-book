
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import AddressBookTable from 'components/AddressBookTable';

function App() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '4rem' }}>
      <CssBaseline />
      <AddressBookTable />
    </Container>
  );
}

export default App;
