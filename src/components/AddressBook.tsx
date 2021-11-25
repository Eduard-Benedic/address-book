import { useReactiveVar } from '@apollo/client'
import { addressListVar } from './address-vars'
import Address from './Address'
import type { AddressType } from './Address'
import AddressModal from './AddressModal'

const AddressBook = () => {
    const addressList = useReactiveVar(addressListVar)

    return (
        <div>
            {
            (addressList?.length > 0) &&
                addressList.map((address: AddressType | null, index) => {
                    if (address) {
                        return <Address key={index} {...address} />
                    }
                    return <p>Fake</p>
                })
            }
            <AddressModal />
        </div>
    )
}

export default AddressBook
