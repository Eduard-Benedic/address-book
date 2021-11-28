import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useQuery } from '@apollo/client'
import { GET_MODAL_STATES } from './operations/queries/getModalStates'
import { addressMutations } from './operations/mutations/index'
import { countries } from './countries'

const ManualAddressModal = () => {
  const { data: modals } = useQuery(GET_MODAL_STATES, {
    fetchPolicy: 'cache-and-network'
  })
  const open = modals.modalStates.manual

  const handleClose = () => {
    addressMutations.switchModalStates(false, false)
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      line1: '',
      line2: '',
      line3: '',
      postcode: '',
      town: '',
      country: ''
    }
  })

  const onSubmit = (data: any) => {
    addressMutations.addAddress([data.line1, data.line2, data.line3], data.postcode, data.town, data.country)
    reset()
    handleClose()
  }

  /**
    * @remarks TextField expects an inputRef property not ref
  */
  const registerCreator = (fieldName: any, isRequired?: boolean) => {
    if (isRequired) {
      const { ref, ...inputProps } = register(fieldName, {
        required: 'This field is required'
      })
      return {
        inputRef: ref,
        ...inputProps
      }
    }
    const { ref, ...inputProps } = register(fieldName)
    return {
      inputRef: ref,
      ...inputProps
    }
  }

  return (
    <Box>
      <Dialog data-testid="manual-address-modal" open={open} onClose={handleClose}>
          <DialogTitle>Add an address</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: '40px' }}>
              Please enter your address below
            </DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                id="line1"
                label="Line 1"
                required
                error={!!errors.line1}
                helperText={errors?.line1?.message}
                inputProps={{
                  "data-testid": "line1"
                }}
                {...registerCreator('line1', true)}
              />
             <TextField
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                id="line2"
                label="Line 2"
                error={!!errors.line2}
                helperText={errors?.line2?.message}
                inputProps={{
                  "data-testid": "line2"
                }}
                {...registerCreator('line2')}
              />
              <TextField
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                id="line3"
                label="Line 3"
                error={!!errors.line3}
                helperText={errors?.line3?.message}
                inputProps={{
                  "data-testid": "line3"
                }}
                {...registerCreator('line3')}
              />
              <TextField
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                id="town"
                label="Town"
                required
                error={!!errors.town}
                helperText={errors?.town?.message}
                inputProps={{
                  "data-testid": "town"
                }}
                {...registerCreator('town', true)}
              />
              <TextField
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                id="postcode"
                label="Postcode"
                required
                error={!!errors.postcode}
                helperText={errors?.postcode?.message}
                inputProps={{
                  "data-testid": "postcode"
                }}
                {...registerCreator('postcode', true)}
              />
              <Autocomplete
                id="country-select"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => {
                  return (
                    <TextField
                      error={!!errors.country}
                      required
                      {...registerCreator('country', true)}
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',// disable autocomplete and autofill
                        "data-testid": "country"
                      }}
                    />
                  )
                }}
              />
              <DialogActions sx={{ paddingTop: (theme) => theme.spacing(4) }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ManualAddressModal
