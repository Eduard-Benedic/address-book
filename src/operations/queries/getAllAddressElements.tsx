import { gql } from '@apollo/client'

export const GET_ALL_ADDRESS_ELEMENTS = gql`
  query GetAllAddressElements {
    addressList @client {
      line
      postcode
      town
      country
    }
  }
`
