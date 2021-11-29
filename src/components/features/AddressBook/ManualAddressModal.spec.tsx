import { render } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/dom'
import { MockedProvider } from '@apollo/client/testing'
import ManualAddressModal from './ManualAddressModal'
// import { addressMutations } from './operations/mutations/index'
import { createCacheWithDefaults } from './apollo/createCache'

jest.mock('./operations/mutations/index')
// const addressMutationsMocked = mocked(addressMutations, true)

const cache = createCacheWithDefaults({
  lookup: false,
  manual: true
}, [])

describe('ManualAddressModal.tsx', () => {
  const renderWithProvider = () => (
    render(
      <MockedProvider cache={cache} addTypename={false}>
        <ManualAddressModal />
      </MockedProvider>
    )
  )

  test(`it allows a user to type text in the fields,
  except for the country field because it is a combo box`,
  async () => {
    const { getByTestId } = renderWithProvider()
    const line1Input = getByTestId('line1')    
    const line2Input = getByTestId('line2')    
    const line3Input = getByTestId('line3')    
    const postcodeInput = getByTestId('postcode')    
    const townInput = getByTestId('town')

    const values = {
      line1: 'Line 1 val',
      line2: 'Line 2 val',
      line3: 'Line 3 val',
      postcode: 'Postcode val',
      town: 'Town val'
    }

    await waitFor (() => {
      fireEvent.change(line1Input, { target: { value: values.line1 } })
      fireEvent.change(line2Input, { target: { value: values.line2 } })
      fireEvent.change(line3Input, { target: { value: values.line3 } })
      fireEvent.change(postcodeInput, { target: { value: values.postcode } })
      fireEvent.change(townInput, { target: { value: values.town } })
    })
    expect(line1Input).toHaveValue(values.line1)
    expect(line2Input).toHaveValue(values.line2)
    expect(line3Input).toHaveValue(values.line3)
    expect(postcodeInput).toHaveValue(values.postcode)
    expect(townInput).toHaveValue(values.town)
  })

  test(`submitting the form with required inputs will warn the user
    Line 2, 3 not required and the rest of the fields required
  `, async () => {
    const { getByTestId, getByText } = renderWithProvider()
    const line1Input = getByTestId('line1')    
    const line2Input = getByTestId('line2')    
    const line3Input = getByTestId('line3')
    const postcodeInput = getByTestId('postcode')    
    const townInput = getByTestId('town')
    const countryInput = getByTestId('country')
    const addAddressButton = getByText('Add')

    await waitFor(() => {
      fireEvent.click(addAddressButton)
    })

    expect(line1Input).toHaveAttribute('aria-invalid', 'true')
    expect(line2Input).not.toHaveAttribute('aria-invalid', 'true')
    expect(line3Input).not.toHaveAttribute('aria-invalid', 'true')
    expect(postcodeInput).toHaveAttribute('aria-invalid', 'true')
    expect(townInput).toHaveAttribute('aria-invalid', 'true')
    expect(countryInput).toHaveAttribute('aria-invalid', 'true')
  })
})
