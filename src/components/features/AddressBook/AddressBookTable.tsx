import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  styled
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useQuery } from '@apollo/client'
import { GET_ALL_ADDRESS_ELEMENTS } from 'operations/queries/getAllAddressElements'
import AddressBookRow from './AddressBookRow'

const StyledTableCell = styled(TableCell)(({ theme }) => (
  {
      fontSize: '1.6rem',
      foontWeight: 'bold',
      backgroundColor: theme.palette.secondary.light,
      color: grey[800]
  }
))

const AddressBookTable = () => {
  const { data, loading } = useQuery(GET_ALL_ADDRESS_ELEMENTS, {
    fetchPolicy: 'cache-and-network'
  })
  return (
    <Box>
      {data.addressList.length > 0 && (
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
                  {data.addressList.map((address: any, index: number) => (
                      <AddressBookRow key={index} {...address} />
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default AddressBookTable
