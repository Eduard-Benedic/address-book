import { render } from '@testing-library/react'
import AddressBookRow from './AddressBookRow'
import type { AddressBookRowType } from './AddressBookRow'

describe('AddressBookRow.tsx', () => {
  const data = {
    line: ['First line text', 'Second line text', 'Third line text'],
    postcode: 'HA87AA',
    town: 'London',
    country: 'England'
  }
  const createFakeData = (obj?: Partial<AddressBookRowType>) : AddressBookRowType => {
    return {
      ...data,
      ...obj
    } as AddressBookRowType
  }

  const fakeData = createFakeData()
  test('it renders the component when the required props are passed', () => {
    render(<AddressBookRow {...fakeData} />, {
      container: document.body.appendChild(document.createElement('tbody'))
    })
  })

  test('it renders all 3 address lines', () => {
    const { getByText } = render(<AddressBookRow {...fakeData} />, {
      container: document.body.appendChild(document.createElement('tbody'))
    })

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
    const { getByText, queryByTestId } = render(<AddressBookRow {...data} />, {
      container: document.body.appendChild(document.createElement('tbody'))
    })

    const line1 = getByText(data.line[0])
    const line2 = queryByTestId('line2')
    const line3 = queryByTestId('line3')

    expect(line1).toBeInTheDocument()
    expect(line1).toHaveTextContent(data.line[0])
    expect(line2).not.toBeInTheDocument()
    expect(line3).not.toBeInTheDocument()
  })

  test('the remaining props: town and country are visible and have the correct values', () => {
    const { getByText } = render(<AddressBookRow {...data} />, {
      container: document.body.appendChild(document.createElement('tbody'))
    })

    const town = getByText(data.town)
    const country = getByText(data.country)

    expect(town).toHaveTextContent(data.town)
    expect(town).toBeVisible()
    expect(country).toHaveTextContent(data.country)
    expect(country).toBeVisible()
  })
})