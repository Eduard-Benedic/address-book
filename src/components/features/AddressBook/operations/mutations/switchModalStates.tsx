import { ReactiveVar } from '@apollo/client'
import { ModalStates } from 'cache'

export default function switchModalStates(modalStatesVar: ReactiveVar<ModalStates>) {
  return (lookup: boolean, manual: boolean) => {
    modalStatesVar({
      lookup,
      manual
    })
  }
}
