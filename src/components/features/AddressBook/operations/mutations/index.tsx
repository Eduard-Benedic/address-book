import createAddressSugesstion from "./addAddressSuggestion"
import switchModalStates from "./switchModalStates"
import { addressListVar, modalStatesVar } from "cache"

export const addressMutations = {
  addAddress: createAddressSugesstion(addressListVar),
  switchModalStates: switchModalStates(modalStatesVar)
}
