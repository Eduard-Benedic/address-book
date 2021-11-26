import * as React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel
} from '@mui/material'
import Switch from '@mui/material/Switch'
import { isLookupModalOpen, isManualModalOpen } from './address-vars'
import ManualAddressModal from "./ManualAddressModal"
import LookupAddressModal from './LookupAddressModal'

const ActionBar = () => {
  const [isLookupMode, setIsLookupMode] = React.useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLookupMode(event?.target.checked)
  }
  const handleClickOpen = () => {
    if (isLookupMode) {
      isLookupModalOpen(true)
      isManualModalOpen(false)
    } else {
      isLookupModalOpen(false)
      isManualModalOpen(true)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <ManualAddressModal />
        <LookupAddressModal />
      </Box>

    <Button
      sx={{ marginRight: 10 }}
      variant="contained"
      color="primary"
      onClick={handleClickOpen}
    >
      Add address
    </Button>
      <FormControl>
        <FormLabel component="legend">Enable lookup mode</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isLookupMode} onChange={handleChange} name="Lookup Mpde"/>}
            label="Lookup" />
        </FormGroup>
      </FormControl>
    </Box>
  )
}

export default ActionBar;
