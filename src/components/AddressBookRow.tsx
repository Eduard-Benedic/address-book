import { List, ListItem, TableRow, TableCell, styled } from '@mui/material'

export type AddressBookRowType = {
    line: {
        line1: string
        line2: string
        line3: string
    }
    postcode: string
    town: string
    country: string
}

const Wrapper = styled(TableRow)(({ theme }) => ({
    // display: 'flex',
    // justifyContent: 'space-between',
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2)
}))

const AddressBookRow = (props: AddressBookRowType) => {
    return (
        <Wrapper>
            <TableCell>
                <List sx={{ display: 'flex', flexDirection: 'column' }}>
                    {props.line.line1 ? <ListItem>Line1: {props.line.line1}</ListItem> : ''}
                    {props.line.line2 ? <ListItem>Line2: {props.line.line2}</ListItem> : ''}
                    {props.line.line3 ? <ListItem>Line3: {props.line.line3}</ListItem> : ''}
                </List>
            </TableCell>
            <TableCell>{props.postcode}</TableCell>
            <TableCell>{props.town}</TableCell>
            <TableCell>{props.country}</TableCell>
        </Wrapper>
    )
}

export default AddressBookRow;
