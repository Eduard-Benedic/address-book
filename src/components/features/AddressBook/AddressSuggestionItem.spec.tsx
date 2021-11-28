import { render, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { mocked } from 'ts-jest/utils'
import AddressSuggestionItem from './AddressSuggestionItem'
import type { AddressSugestionType } from './AddressSuggestionItem'
import { addressMutations } from './operations/mutations/index'

jest.mock('./AddressBookAPI')

const addressMutationsMocked = mocked(addressMutations, true)

describe('AddressSugestionItem.tsx', () => {
  const data = {
    line: ['First line text', 'Second line text', 'Third line text'],
    postcode: 'HA87AA',
    town: 'London',
    country: 'England',
    onAddressSelection: () => {}
  }
  const createFakeData = (obj?: Partial<AddressSugestionType>) : AddressSugestionType => {
    return {
      ...data,
      ...obj,
      onAddressSelection: () => {}
    } as AddressSugestionType
  }

  const fakeData = createFakeData()

  test('clicking the address will call the addAddress mutation', async () => {
    const { getByTestId } = render(<AddressSuggestionItem {...fakeData} />)
    const addressSuggestion = getByTestId('address-suggestion-item')
    fireEvent.click(addressSuggestion)

    await setTimeout(() => {
       expect(addressMutationsMocked.addAddress.mock.calls).toHaveLength(1)
    }, 0)
  })

  test('it renders the component when the required props are passed', () => {
    render(<AddressSuggestionItem {...fakeData} />)
  })

  test('it renders all 3 address lines', () => {
    const { getByText } = render(<AddressSuggestionItem {...fakeData} />)

    const line1 = getByText(data.line[0])
    const line2 = getByText(data.line[1])
    const line3 = getByText(data.line[2])

    expect(line1).toHaveTextContent(data.line[0])
    expect(line2).toHaveTextContent(data.line[1])
    expect(line3).toHaveTextContent(data.line[2])
  })

  test('it only renders the line 1 if the second and third items are not inside the line property', () => {
    const data = createFakeData({
      line: ['First line']
    })
    const { getByText, queryByTestId } = render(<AddressSuggestionItem {...data} />)

    const line1 = getByText(data.line[0])
    const line2 = queryByTestId('line2')
    const line3 = queryByTestId('line3')

    expect(line1).toBeInTheDocument()
    expect(line1).toHaveTextContent(data.line[0])
    expect(line2).not.toBeInTheDocument()
    expect(line3).not.toBeInTheDocument()
  })

  test('the remaining props: town and country are visible and have the correct values', () => {
    const { getByText } = render(<AddressSuggestionItem {...data} />)

    const town = getByText(data.town)
    const country = getByText(data.country)

    expect(town).toHaveTextContent(data.town)
    expect(town).toBeVisible()
    expect(country).toHaveTextContent(data.country)
    expect(country).toBeVisible()
  })
})
