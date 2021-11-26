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
    fontWeight: 'bold',
    fontSize: '.8rem',
    minWidth: theme.spacing(8)
}))

const AddressBookRow = (props: AddressBookRowType) => {

    const renderFieldIndicator = (title: string, val?: string) => {
        if (val) {
            return (
                <ListItem>
                    <StyledSubtitle>{title}</StyledSubtitle>
                    <Typography>{val}</Typography>
                </ListItem>
            )
        }
    }
    return (
        <TableRow>
            <TableCell>
                <List sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ListItem>
                        <StyledSubtitle>Line 1</StyledSubtitle>{props.line[0]}
                    </ListItem>
                    {renderFieldIndicator('Line 2', props.line[1])}
                    {renderFieldIndicator('Line 3', props.line[2])}
                </List>
            </TableCell>
            <TableCell>{props.postcode}</TableCell>
            <TableCell>{props.town}</TableCell>
            <TableCell>{props.country}</TableCell>
        </TableRow>
    )
}

export default AddressBookRow;
