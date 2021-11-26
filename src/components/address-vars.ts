import { makeVar } from "@apollo/client";
import type { AddressBookRowType } from './AddressBookRow'

export const addressListVar = makeVar<Array<AddressBookRowType | null>>([])
export const isLookupModalOpen = makeVar<boolean>(false)
export const isManualModalOpen = makeVar<boolean>(false)

export const countryVar = makeVar<string>('')