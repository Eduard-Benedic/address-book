import { Box, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { addressMutations } from './operations/mutations/index'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export type AddressSugestionType = {
  line: Array<string>
  postcode: string
  town: string
  country: string
  onAddressSelection: () => void
}

const AddressSugestionItem = (props: AddressSugestionType) => {
  const addSuggestion = () => {
    addressMutations.addAddress(props.line, props.postcode, props.town, props.country)
    props.onAddressSelection()
    addressMutations.switchModalStates(false, false)
  }
  return (
    <ListItem
      onClick={addSuggestion}
      data-testid="address-suggestion-item"
    >
      <ListItemButton>
        <ListItemText>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ marginRight: '15px' }}>
              <Typography data-testid="line1" component="span">{props.line[0]}</Typography>
              {props.line[1] && <Typography data-testid="line2"  component="span">{props.line[1]}</Typography>}
              {props.line[2] && <Typography data-testid="line3"  component="span">{props.line[2]}</Typography>}
            </Box>
            <Typography sx={{ marginRight: '15px' }}>{props.town}</Typography>
            <Typography>{props.country}</Typography>
          </Box>
        </ListItemText>
        <ListItemIcon sx={{ marginLeft: (theme) => theme.spacing(4) }}>
          <AddCircleIcon color="primary"  fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default AddressSugestionItem
