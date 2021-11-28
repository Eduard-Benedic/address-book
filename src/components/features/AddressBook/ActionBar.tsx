import * as React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material'
import { addressMutations } from './operations/mutations'
import ManualAddressModal from "./ManualAddressModal"
import LookupAddressModal from './LookupAddressModal'

const ActionBar = () => {
  const [isLookupMode, setIsLookupMode] = React.useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLookupMode(event?.target.checked)
  }
  const handleClickOpen = () => {
    if (isLookupMode) addressMutations.switchModalStates(true, false)
    else addressMutations.switchModalStates(false, true)
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
            control={<Switch checked={isLookupMode} onChange={handleChange} name="Lookup Mode"/>}
            label="Lookup" />
        </FormGroup>
      </FormControl>
    </Box>
  )
}

export default ActionBar;
