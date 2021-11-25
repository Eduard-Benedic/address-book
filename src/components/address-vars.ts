import { makeVar } from "@apollo/client";
import type { AddressBookRowType } from './AddressBookRow'

export const addressListVar = makeVar<Array<AddressBookRowType | null>>([])
