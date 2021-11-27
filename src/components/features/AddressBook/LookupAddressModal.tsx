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
import { useReactiveVar } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid'
import { isLookupModalOpen } from './reactive-vars';
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
  const setState = (state: boolean, message: string, loading?: boolean) => {
    setErrorState(state)
    setErrorMessage(message)
    if (loading) {
      setLoadingState(loading)
    }
  }
  return [{ hasError: errorState, message: errorMessage, loading: loadingState }, setState] as const
}

const LookupAddressModal = () => {
  const [errorAndLoadingState, setErrorAndLoadingState] = useErrorAndLoadingState()
  const [postcode, setPostcode] = React.useState<string>('')
  const [lookupValues, setLookupValues] = React.useState([]);
  const open = useReactiveVar(isLookupModalOpen)

  const handleClose = () => { isLookupModalOpen(false) }
  /** * @remarks the API endpoint used requires a specific format(no spaces and lowercase)*/
  const formatPostcode = (text: string) => text.trim().replace(/ /g,'').toLowerCase()
  const fetchLookupAddresses = () => {
      if (postcode === '') {
        setErrorAndLoadingState(true, 'Empty value not allowed')
        return
      }
      setErrorAndLoadingState(false, '', true)
      fetchAddress(formatPostcode(postcode))
        .then((data: any) => {
          setErrorAndLoadingState(false, '', false)
          setLookupValues(data.addresses)
        })
        .catch((err) => setErrorAndLoadingState(true, err.response.data.Message, false))
  }

  return (
    <Box>
      <Dialog onClose={handleClose} open={open} fullWidth={true as boolean}>
          <DialogTitle>Please enter a postcode</DialogTitle>
          <DialogContent>
              <TextField
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
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <List sx={{ minHeight: '100px' }}>
                {
                  errorAndLoadingState.loading === true ?
                  <Box data-testid="spinner" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
                    <CircularProgress />
                  </Box>
                  : (
                    lookupValues.map((lookup: any) => {
                      /**
                       * @remarks to see shape of the data returned go to https://getaddress.io/
                       * 
                       */
                      const { line_1, line_2, line_3, town_or_city, country} = lookup
                      console.log(lookup)
                      return (
                        <AddressSuggestionItem
                          key={uuidv4()}
                          line={[line_1, line_2, line_3]}
                          town={town_or_city}
                          country={country}
                          postcode={postcode}
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
