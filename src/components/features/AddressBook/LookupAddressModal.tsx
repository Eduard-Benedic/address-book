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
import { isLookupModalOpen } from './reactive-vars';
import AddressSuggestionItem from './AddressSuggestionItem';
import { fetchAddress } from './AddressBookAPI';

const LookupAddressModal = () => {
  const open = useReactiveVar(isLookupModalOpen)
  const [isPostcodeInvalid, setIsPostcodeInvalid] = React.useState<boolean>(false)
  const [helperText, setHelperText] = React.useState<string>('')

  const [postcode, setPostcode] = React.useState<string>('')
  const [lookupValues, setLookupValues] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleClose = () => {
    isLookupModalOpen(false)
  }

  const handleTextFieldChange = (event: React.SyntheticEvent) => {
    const target = event.target as any
    setPostcode(target.value)
  }

  const makeCall = () => {
      setIsLoading(true)
      fetchAddress(postcode, true)
        .then((data: any) => {
          setIsLoading(false)
          setIsPostcodeInvalid(false)
          setHelperText('')
          setLookupValues(data.addresses)
        })
        .catch((err) => {
          console.log(err.response.data, 'err')
          setIsLoading(false)
          setIsPostcodeInvalid(true)
          setHelperText(err.response.data.Message)
        })
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true as boolean}
      >
          <DialogTitle>Please enter a postcode</DialogTitle>
          <DialogContent>
              <TextField
                error={isPostcodeInvalid}
                helperText={helperText}
                autoFocus
                margin="dense"
                id="lookup-postcode"
                label="Postcode"
                type="text"
                fullWidth
                variant="standard"
                value={postcode}
                onChange={handleTextFieldChange}
              />
              <List sx={{ minHeight: '100px' }}>
                {
                  isLoading === true ?
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}
                  >
                    <CircularProgress />
                  </Box>
                  : (
                    lookupValues.map((lookup: any) => {
                      const { line_1, line_2, line_3, town_or_city, country} = lookup
                      return (
                        <AddressSuggestionItem
                          line={[line_1, line_2, line_3]}
                          town={town_or_city}
                          country={country}
                          postcode={postcode}
                        />)
                    })
                  )
                }
              </List>
          </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={makeCall}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LookupAddressModal
