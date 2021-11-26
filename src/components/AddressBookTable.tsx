import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Box,
    styled,
    Typography
} from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { addressListVar } from './address-vars'
import { grey } from '@mui/material/colors'
import AddressBookRow from './AddressBookRow'
import ActionBar from './ActionBar'

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
        <Box sx={{ boxShadow: (theme) => theme.shadows[6], padding: (theme) => theme.spacing(6) }}>
            <Typography
                sx={{
                    marginBottom: (theme) => theme.spacing(10),
                    fontSize: '3rem'
                }}
                variant="h2"
            >
                Your Address Book
            </Typography>
            <Box
                sx={{
                    paddingBottom: (theme) => theme.spacing(8)
                }}
            >
                <ActionBar />
            </Box>
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
        </Box>
    )
}

export default AddressBookTable
