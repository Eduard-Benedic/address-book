import * as React from 'react';
// import axios from 'axios';
import { fetchData } from './data';
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

const LookupAddressModal = () => {
  const open = useReactiveVar(isLookupModalOpen)
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
      fetchData()
        .then((data: any) => {
          setIsLoading(false)
          setLookupValues(data.addresses)
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
