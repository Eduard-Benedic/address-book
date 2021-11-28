import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client'
import { AddressBookRowType } from 'components/features/AddressBook/AddressBookRow'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        addressList: {
          read() {
            return addressListVar()
          }
        },
        modalStates: {
          read() {
            return modalStatesVar()
          }
        }
      }
    }
  }
})

export type AddressBookRowList = AddressBookRowType[]
export type ModalStates = {
  lookup: boolean
  manual: boolean
}

const addressListInitial : AddressBookRowList = []
const modalStatesInitial : ModalStates = {
  lookup: false,
  manual: false
}

export const addressListVar: ReactiveVar<AddressBookRowList> = makeVar<AddressBookRowList>(
  addressListInitial
)
export const modalStatesVar : ReactiveVar<ModalStates> = makeVar<ModalStates>(
  modalStatesInitial
)
