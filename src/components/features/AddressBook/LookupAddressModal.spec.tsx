import { render } from '@testing-library/react'
import { fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/dom'
// import { mocked } from 'ts-jest/utils'
// import { fetchAddress } from './AddressBookAPI'
import { isLookupModalOpen } from './reactive-vars'
import LookupAddressModal from './LookupAddressModal'

jest.mock('./AddressBookAPI')

describe('LookupAddressModal.tsx', () => {
  test('it shows an error message when trying to search an empty postcode', () => {
    /**
     * @remarks before we do anything will make sure the modal is open
     */
    isLookupModalOpen(true)
    const { getByText } = render(<LookupAddressModal />)

    const search = getByText('Search')
    fireEvent.click(search)
    // This text is inside the component. We couple this because there is no reason to pass this text
    // as a prop
    const errorHelperText = getByText('Empty value not allowed')

    expect(errorHelperText).toBeInTheDocument()
    expect(errorHelperText).toBeVisible()
  })

  test('it spins a loader when a postcode is added and the search button is clicked', async () => {
    isLookupModalOpen(true)
    const { baseElement, getByText, getByTestId, queryByTestId } = render(<LookupAddressModal />)
    const search = getByText('Search')
    const input = getByTestId('lookup-postcode-input')
    let spinner = queryByTestId('spinner')
    expect(spinner).toBeNull()
    fireEvent.change(input, { target: { value: 'HA87AA' } })
    fireEvent.click(search)
    
    await waitFor(() => {
      spinner = getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toBeVisible()
    })
  })

  test('it renders a list of address suggestions when the data is retrieved from API', async () => {
    // first we need to get to the point where the fetchAddress is called. Then will mock it
    // Will use the code from above to do that
    const { getByText, getByTestId } = render(<LookupAddressModal />)
    const search = getByText('Search')
    const input = getByTestId('lookup-postcode-input')
    
    fireEvent.change(input, { target: { value: 'HA87AA' } })
    fireEvent.click(search)

    await waitForElementToBeRemoved(() => getByTestId('spinner'))
  })
})
