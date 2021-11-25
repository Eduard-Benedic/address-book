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
    DialogTitle
} from '@mui/material'

const LooupAddressModal = () => {
  const [postcode, setPostcode] = React.useState<string>('')
  const [lookupValues, setLookupValues] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  const handleTextFieldChange = (event: React.SyntheticEvent) => {
    const target = event.target as any
    setPostcode(target.value)
  }

  const makeCall = () => {
      fetchData()
        .then((data: any) => {
          setLookupValues(data.addresses)
        })
  }

  return (
    <Box>
      <Button sx={{ marginRight: 10 }} variant="outlined" onClick={handleClickOpen}>Lookup address</Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true as boolean}>
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
              {
                lookupValues.map((lookup: any) => (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>{lookup.line_1}</p>
                    <p>{lookup.country}</p>
                    <p>{lookup.town_or_city}</p>
                  </Box>
                ))
              }
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={makeCall}>Search</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LooupAddressModal;
