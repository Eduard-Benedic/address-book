import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Box
} from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { addressListVar } from './address-vars'
import AddressBookRow from './AddressBookRow'
import ActionBar from './ActionBar'

const AddressBookTable = () => {
    const addressList = useReactiveVar(addressListVar)

    return (
        <Box>
            <ActionBar />
            <TableContainer sx={{  }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Line 1</TableCell>
                            <TableCell>Postcode</TableCell>
                            <TableCell>Town</TableCell>
                            <TableCell>Country</TableCell>
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
