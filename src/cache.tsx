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
        }
      }
    }
  }
})

export type AddressBookRowList = AddressBookRowType[]

const addressListInitial : AddressBookRowList = []

export const addressListVar: ReactiveVar<AddressBookRowList> = makeVar<AddressBookRowList>(
  addressListInitial
)
