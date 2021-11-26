import { Box, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { addressListVar } from './reactive-vars';
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
              <Typography>{props.line[0]}</Typography>
              {props.line[1] ? <Typography>{props.line[1]}</Typography> : ''}
              {props.line[2] ? <Typography>{props.line[2]}</Typography> : ''}
            </Box>
            <Typography>{props.town}</Typography>
            <Typography>{props.country}</Typography>
          </Box>
        </ListItemText>
        <ListItemIcon sx={{ marginLeft: (theme) => theme.spacing(10) }}>
          <AddCircleIcon color="primary"  fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default AddressSugestionItem
