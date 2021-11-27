import createAddAddress from "./addAddress"
import { addressListVar } from "cache"

export const addressMutations = {
  addAddress: createAddAddress(addressListVar)
}
