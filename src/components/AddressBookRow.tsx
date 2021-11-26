import { List, ListItem, TableRow, TableCell, styled } from '@mui/material'

export type AddressBookRowType = {
    line: [string, string, string]
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
                    <ListItem>Line1: {props.line[0]}</ListItem>
                    {props.line[1] ? <ListItem>Line2: {props.line[1]}</ListItem> : ''}
                    {props.line[2] ? <ListItem>Line3: {props.line[2]}</ListItem> : ''}
                </List>
            </TableCell>
            <TableCell>{props.postcode}</TableCell>
            <TableCell>{props.town}</TableCell>
            <TableCell>{props.country}</TableCell>
        </Wrapper>
    )
}

export default AddressBookRow;
