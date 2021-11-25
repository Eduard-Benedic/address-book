import { makeVar } from "@apollo/client";
import type { AddressType } from './Address'

export const addressListVar = makeVar<Array<AddressType | null>>([])
