import { ReactiveVar } from '@apollo/client'
import { AddressBookRowList } from 'cache'

export default function createAddressSugesstion(addressListVar: ReactiveVar<AddressBookRowList>) {
  return (line: Array<string>, postcode: string, town: string, country: string) => {
    const allAddressList = addressListVar()
    const address = {
      line,
      postcode,
      town,
      country
    }
    addressListVar(allAddressList.concat([address]))
  }
}