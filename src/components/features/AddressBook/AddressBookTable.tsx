import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  styled
} from '@mui/material'
import { grey } from '@mui/material/colors'
import AddressBookRow from './AddressBookRow'
import { useReactiveVar } from '@apollo/client'
import { addressListVar } from './reactive-vars'

const StyledTableCell = styled(TableCell)(({ theme }) => (
  {
      fontSize: '1.6rem',
      foontWeight: 'bold',
      backgroundColor: theme.palette.secondary.light,
      color: grey[800]
  }
))

const AddressBookTable = () => {
  const addressList = useReactiveVar(addressListVar)
  return (
    <TableContainer>
      <Table>
          <TableHead>
              <TableRow>
                  <StyledTableCell>Line</StyledTableCell>
                  <StyledTableCell>Postcode</StyledTableCell>
                  <StyledTableCell>Town</StyledTableCell>
                  <StyledTableCell>Country</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {addressList.map((address: any, index) => (
                  <AddressBookRow key={index} {...address} />
              ))}
          </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AddressBookTable
