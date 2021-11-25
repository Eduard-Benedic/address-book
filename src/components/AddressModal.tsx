import * as React from 'react';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { addressListVar } from './address-vars';

enum Fields {
  Line1 = 'line1',
  Line2 = 'line2',
  Line3 = 'line3',
  Postcode = 'postcode',
  Town = 'town',
  Country = 'country'

}

export default function AddressModal() {
  const [line1, setLine1] = React.useState<string>('')
  const [line2, setLine2] = React.useState<string>('')
  const [line3, setLine3] = React.useState<string>('')
  const [postcode, setPostcode] = React.useState<string>('')
  const [town, setTown] = React.useState<string>('')
  const [country, setCountry] = React.useState<string>('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (event: React.SyntheticEvent) => {
    const target = event.target as any
    if (target.id === Fields.Line1) setLine1(target.value)
    if (target.id === Fields.Line2) setLine2(target.value)
    if (target.id === Fields.Line3) setLine3(target.value)
    if (target.id === Fields.Postcode) setPostcode(target.value)
    if (target.id === Fields.Town) setTown(target.value)
    if (target.id === Fields.Country) setCountry(target.value)
  }

  const addAddressToBook = () => {
    const address  = {
      line: line1,
      postcode,
      town,
      country
    }
    addressListVar([...addressListVar(), address])
    handleClose()
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>Add address</Button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add an address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your address below
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id={Fields.Line1}
                label="Line 1"
                type="text"
                fullWidth
                variant="standard"
                value={line1}
                onChange={handleTextFieldChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id={Fields.Line2}
                label="Line 2"
                type="text"
                fullWidth
                variant="standard"
                value={line2}
                onChange={handleTextFieldChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id={Fields.Line3}
                label="Line 3"
                type="text"
                fullWidth
                variant="standard"
                value={line3}
                onChange={handleTextFieldChange}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id={Fields.Postcode}
                  label="Postcode"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={postcode}
                  onChange={handleTextFieldChange}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id={Fields.Town}
                  label="Town"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={town}
                  onChange={handleTextFieldChange}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id={Fields.Country}
                  label="Country"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={country}
                  onChange={handleTextFieldChange}
              />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addAddressToBook}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
