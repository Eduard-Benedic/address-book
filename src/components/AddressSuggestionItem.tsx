import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { addressListVar } from './address-vars';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddressSugestionType = {
  line: [string, string, string]
  postcode: string
  town: string
  country: string
}

const AddressSugestionItem = (props: AddressSugestionType) => {
  const addSuggestion = () => {
    addressListVar([...addressListVar(), {
      line: props.line,
      postcode: props.postcode,
      town: props.town,
      country: props.country
    }])
  }
  return (
    <ListItem onClick={addSuggestion}>
      <ListItemButton>
        <ListItemText>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <p>{props.line[0]}</p>
              {props.line[1] ? <p>{props.line[1]}</p> : ''}
              {props.line[2] ? <p>{props.line[2]}</p> : ''}
            </Box>
            <p>{props.town}</p>
            <p>{props.country}</p>
          </Box>
        </ListItemText>
        <ListItemIcon sx={{ marginLeft: (theme) => theme.spacing(5) }}>
          <AddCircleIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default AddressSugestionItem
