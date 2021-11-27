import {
    List,
    ListItem,
    TableRow,
    TableCell,
    styled,
    Typography
} from '@mui/material'

export type AddressBookRowType = {
    line: [string, string, string]
    postcode: string
    town: string
    country: string
}

const StyledSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    fontSize: '.9rem'
}))

const AddressBookRow = (props: AddressBookRowType) => {
    return (
        <TableRow>
            <TableCell>
                <List sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ListItem>
                        <StyledSubtitle>{props.line[0]},</StyledSubtitle>
                        {props.line[1] && <StyledSubtitle>{props.line[1]},</StyledSubtitle>}
                        {props.line[2] && <StyledSubtitle>{props.line[2]}</StyledSubtitle>}
                    </ListItem>
                </List>
            </TableCell>
            <TableCell
                sx={{
                    color: (theme) => theme.palette.primary.dark,
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                }}
            >
                {props.postcode}
            </TableCell>
            <TableCell>{props.town}</TableCell>
            <TableCell>{props.country}</TableCell>
        </TableRow>
    )
}

export default AddressBookRow;
