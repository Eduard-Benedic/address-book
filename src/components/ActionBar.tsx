import { Box } from '@mui/material'
import ManualAddressModal from "./ManualAddressModal";
import LookupAddressModal from './LookupAddressModal';

const ActionBar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ManualAddressModal />
      <LookupAddressModal />
    </Box>
  )
}

export default ActionBar;
