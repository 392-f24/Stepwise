import AddIcon from '@mui/icons-material/Add'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

const AddItem = ({ label, onAdd }) => {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = async () => {
    if (inputValue.trim()) {
      await onAdd(inputValue)
      setInputValue('')
    }
  }

  return (
    <TextField
      variant='outlined'
      label={label}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      fullWidth
      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                color='primary'
                onClick={handleAdd}
                disabled={!inputValue.trim()}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default AddItem
