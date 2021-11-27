import {
    Box,
    Typography
} from '@mui/material'
import AddressBookTable from './AddressBookTable'
import { useReactiveVar } from '@apollo/client'
import ActionBar from './ActionBar'
import Logo from 'components/Logo'
import { addressListVar } from './reactive-vars'

const AddressBook = () => {
    const addressList = useReactiveVar(addressListVar)
    return (
        <Box
            sx={{
                boxShadow: (theme) => theme.shadows[6],
                padding: (theme) => theme.spacing(6),
                position: 'relative'
            }}
        >
            <Typography
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: (theme) => theme.spacing(10),
                    fontSize: '2.5rem'
                }}
                variant="h2"
            >
                Your Address Book
                <Logo />
            </Typography>
            <Box sx={{ paddingBottom: (theme) => theme.spacing(8) }}>
                <ActionBar />
            </Box>
            {
                addressList.length > 0 && <AddressBookTable />
            }
        </Box>
    )
}

export default AddressBook
