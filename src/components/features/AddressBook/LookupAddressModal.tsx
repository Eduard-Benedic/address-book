import * as React from 'react';
// import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    CircularProgress
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from '@apollo/client'
import { GET_MODAL_STATES } from './operations/queries/getModalStates'
import { addressMutations } from './operations/mutations/index'

import AddressSuggestionItem from './AddressSuggestionItem';
import { fetchAddress } from './AddressBookAPI';

/**
 * 
 * @remarks I've extracted here the logic for setting an error message to keep things
 * a little bit cleaner
 */
const useErrorAndLoadingState = () => {
  const [errorState, setErrorState] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [loadingState, setLoadingState] = React.useState<boolean>(false)
  const setState = (state: boolean, message: string, loading: boolean) => {
    setErrorState(state)
    setErrorMessage(message)
    setLoadingState(loading)
  }
  return [{ hasError: errorState, message: errorMessage, loading: loadingState }, setState] as const
}


const LookupAddressModal = () => {
  const [errorAndLoadingState, setErrorAndLoadingState] = useErrorAndLoadingState()
  const [postcodeInput, setPostcodeInput] = React.useState<string>('')
  const [addressSuggestions, setAddressSuggestions] = React.useState<any>({ addresses: [], postcode: '' });
  const { data: modals } = useQuery(GET_MODAL_STATES, {
    fetchPolicy: 'cache-and-network'
  })
  const open = modals.modalStates.lookup
  const handleClose = () => {
    addressMutations.switchModalStates(false, false)
  }
  const handleAddressSelection = () => {
    setTimeout(() => {
      setAddressSuggestions({
        addresses: [],
        postcode: ''
      })
    }, 500)
  }

  /** * @remarks the API endpoint used requires a specific format(no spaces and lowercase)*/
  const formatPostcode = (text: string) => text.trim().replace(/ /g,'').toLowerCase()
  const fetchLookupAddresses = () => {
      if (postcodeInput === '') {
        setErrorAndLoadingState(true, 'Empty value not allowed', false)
        return
      }
      setErrorAndLoadingState(false, '', true)
      fetchAddress(formatPostcode(postcodeInput))
        .then((res: any) => {
          const { data } = res
          setErrorAndLoadingState(false, '', false)
          setAddressSuggestions({
            addresses: data.addresses,
            postcode: data.postcode
          })
        })
        .catch((err) => setErrorAndLoadingState(true, err.response.data.Message, false))
  }

  return (
    <Box>
      <Dialog onClose={handleClose} open={open} fullWidth={true as boolean}>
          <DialogTitle>Please enter a postcode</DialogTitle>
          <DialogContent>
              <TextField
                onChange={(e) => setPostcodeInput(e.target.value)}
                error={errorAndLoadingState.hasError}
                helperText={errorAndLoadingState.message}
                autoFocus
                margin="dense"
                id="lookup-postcode"
                label="Postcode"
                // beacuse the TextField abstraction
                // https://stackoverflow.com/questions/57110557/react-testing-library-the-given-element-does-not-have-a-value-setter-when-firee
                inputProps={{ "data-testid": "lookup-postcode-input" }}
                type="text"
                fullWidth
                variant="standard"
                value={postcodeInput}
              />
              <List sx={{ minHeight: '100px' }}>
                {
                  errorAndLoadingState.loading === true ?
                  <Box data-testid="spinner" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
                    <CircularProgress />
                  </Box>
                  : (
                    addressSuggestions.addresses.map((address: any) => {
                      /**
                       * @remarks to see shape of the data returned go to https://getaddress.io/
                       * 
                       */
                      const { line_1, line_2, line_3, town_or_city, country} = address
                      return (
                        <AddressSuggestionItem
                          key={uuidv4()}
                          onAddressSelection={handleAddressSelection}
                          line={[line_1, line_2, line_3]}
                          town={town_or_city}
                          country={country}
                          postcode={addressSuggestions.postcode}
                        />
                      )
                    })
                  )
                }
              </List>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">Cancel</Button>
          <Button onClick={fetchLookupAddresses} variant="contained" color="primary">Search</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LookupAddressModal
