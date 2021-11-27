import {
    Box,
    Typography
} from '@mui/material'
import AddressBookTable from './AddressBookTable'
import Logo from 'components/Logo'
import ActionBar from './ActionBar'

const AddressBook = () => {
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
            <AddressBookTable />
        </Box>
    )
}

export default AddressBook
