// @ts-check

import CategoryPicker from '@/components/Home/CategoryPicker'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

const AddItem = ({ label, onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('#000000')

  const handleAdd = async () => {
    if (inputValue.trim()) {
      await onAdd(
        inputValue.trim(),
        label === 'New Goal' ? selectedCategory : null
      )
      setInputValue('')
      setSelectedCategory('#000000')
    }
  }

  // Conditionally render the category picker
  const startAdornment =
    label === 'New Goal' ? (
      <CategoryPicker
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    ) : null

  return (
    <TextField
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      variant='outlined'
      label={label}
      placeholder={`Enter ${label.toLowerCase()}...`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      fullWidth
      slotProps={{
        input: {
          startAdornment,
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
