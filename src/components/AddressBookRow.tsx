import { TableRow, TableCell, styled } from '@mui/material'

export type AddressBookRowType = {
    line: string
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
            <TableCell>{props.line}</TableCell>
            <TableCell>{props.postcode}</TableCell>
            <TableCell>{props.town}</TableCell>
            <TableCell>{props.country}</TableCell>
        </Wrapper>
    )
}

export default AddressBookRow;
