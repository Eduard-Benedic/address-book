import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { addressListVar } from './address-vars';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddressSugestionType = {
  line: {
    line1: string
    line2: string
    line3: string
  }
  postcode: string
  town: string
  country: string
}

const AddressSugestionItem = (props: AddressSugestionType) => {
  const addSuggestion = () => {
    addressListVar([...addressListVar(), {
      line: {
        line1: props.line.line1,
        line2: props.line.line2,
        line3: props.line.line3
      },
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
              <p>{props.line.line1}</p>
              {props.line.line2 ? <p>{props.line.line2}</p> : ''}
              {props.line.line3 ? <p>{props.line.line3}</p> : ''}
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
