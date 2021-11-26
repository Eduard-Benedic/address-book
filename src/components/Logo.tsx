import { Box } from '@mui/material'
import BequetLogo from '../assets/Bequet-logo.png'

const Logo = () => {
  return (
    <Box>
      <img style={{ maxHeight: '60px', opacity: 1 }} src={BequetLogo} alt="Bequet Logo" />
    </Box>
  )
}

export default Logo
