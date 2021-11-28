import { render } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/dom'
import { MockedProvider } from '@apollo/client/testing'
import { mocked } from 'ts-jest/utils'
import LookupAddressModal from './LookupAddressModal'
import { addressMutations } from './operations/mutations/index'
import { data } from './fakeData/index'
import { createCacheWithDefaults } from './apollo/fakeCache'

jest.mock('./AddressBookAPI')
jest.mock('./operations/mutations/index')

const addressMutationsMocked = mocked(addressMutations, true)

const cache = createCacheWithDefaults({
  lookup: true,
  manual: false
}, [])

describe('LookupAddressModal.tsx', () => {
  const renderWithProvider = () => (
    render(
      <MockedProvider cache={cache} addTypename={false}>
        <LookupAddressModal />
      </MockedProvider>
    )
  )
  test('it shows an error message when trying to search an empty postcode', async () => {
    /**
     * @remarks before we do anything will make sure the modal is open
     */
    const { getByText } = renderWithProvider()
    const search = await getByText('Search')
    fireEvent.click(search)
    await waitFor(() => getByText('Empty value not allowed'))
    expect(getByText('Empty value not allowed')).toBeInTheDocument()
  })

  test('it spins a loader when a postcode is added and the search button is clicked', async () => {
    const { getByText, getByTestId, queryByTestId } = renderWithProvider()
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

  test('it renders a list of address suggestions when the data is retrieved from API and hides loading state', async () => {
    const { getByText, getByTestId, getAllByTestId, queryByTestId } = renderWithProvider()
    const search = getByText('Search')
    const input = getByTestId('lookup-postcode-input')

    fireEvent.change(input, { target: { value: 'HA87AA' } })
    fireEvent.click(search)

    await waitFor(() => {
      const suggestionItems = getAllByTestId('address-suggestion-item')
      const spinner = queryByTestId('spinner')

      expect(suggestionItems.length).toEqual(data.data.addresses.length)
      expect(spinner).toBeNull()
    })
  })

  test('on click the suggestion address will be added to the address book array', async () => {
    const { getByText, getByTestId, findAllByTestId } = renderWithProvider()
    const search = getByText('Search')
    const input = getByTestId('lookup-postcode-input')

    fireEvent.change(input, { target: { value: 'HA87AA' } })
    fireEvent.click(search)

    const suggestionItems = await findAllByTestId('address-suggestion-item')
    suggestionItems.forEach((suggestion: any) => {
      fireEvent.click(suggestion)
    })
    /**
     * @remarks need to do the timeout because adding an element to the address list
     * will be done asynchronously
     */
    await setTimeout(() => {
      /**
       * @remarks only test if the mutation is triggered on click event.
       * The rest will be handled by a higher level function
      */
      expect(addressMutationsMocked.addAddress.mock.calls).toHaveLength(suggestionItems.length)
    }, 0)
   
    
  })
})
