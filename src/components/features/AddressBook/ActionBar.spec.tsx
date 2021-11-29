import { screen, render, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { mocked } from 'ts-jest/utils'
import { MockedProvider } from '@apollo/client/testing'
import ActionBar from './ActionBar'
import { createCacheWithDefaults } from './apollo/createCache'
import { addressMutations } from './operations/mutations'

jest.mock('./operations/mutations/index')

const addressMutationsMocked = mocked(addressMutations, true)

const cache = createCacheWithDefaults({
  lookup: false,
  manual: false
}, [])

describe('ActionBar.tsx', () => {
  const renderWithApollo = () => (
    render(
      <MockedProvider cache={cache} addTypename={false}>
        <ActionBar />
      </MockedProvider>
    )
  )
  test('it renders a switcher and a button', async () => {
    const { getByText } = renderWithApollo()

    await waitFor(() => {
      expect(getByText('Add address')).toBeVisible()
      expect(getByText('Enable lookup mode')).toBeVisible()
    })
  })
  test('clicking on the "Add Address" will call the switchModalState apollo mutation', async () => {
    const { getByText } = renderWithApollo()
    const addAddressBtn = getByText('Add address')
    await waitFor(() => { fireEvent.click(addAddressBtn) })

    expect(addressMutationsMocked.switchModalStates.mock.calls).toHaveLength(1)
  })
})
