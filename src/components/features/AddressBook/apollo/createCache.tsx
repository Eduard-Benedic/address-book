import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client'
import { AddressBookRowType } from 'components/features/AddressBook/AddressBookRow'

type AddressBookRowList = AddressBookRowType[]
type ModalStates = {
  lookup: boolean
  manual: boolean
}

export const createCacheWithDefaults = (
  modalStatesInitial: ModalStates,
  addressListInitial: AddressBookRowList
) => {
  const modalStatesVar : ReactiveVar<ModalStates> = makeVar<ModalStates>(
    modalStatesInitial
  )
  const addressListVar: ReactiveVar<AddressBookRowList> = makeVar<AddressBookRowList>(
    addressListInitial
  )
  const cache: InMemoryCache = new InMemoryCache({
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
  return cache
}
