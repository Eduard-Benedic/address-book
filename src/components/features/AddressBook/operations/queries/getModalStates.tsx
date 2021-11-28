import { gql } from '@apollo/client'

export const GET_MODAL_STATES = gql`
  query GetAllModalStates {
    modalStates @client {
      lookup
      manual
    }
  }
`