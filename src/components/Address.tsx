import { Box } from '@mui/material'

export type AddressType = {
    line: string
    postcode: string
    town: string
    country: string
}

const Address = (props: AddressType) => {
    return (
        <Box>
            <p>{props.line}</p>
            <p>{props.postcode}</p>
            <p>{props.town}</p>
            <p>{props.country}</p>
        </Box>
    )
}

export default Address;
