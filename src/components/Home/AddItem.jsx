// @ts-check

import CategoryPicker from '@/components/Home/CategoryPicker'
import { DateTimePicker } from '@/components/Home/DateTimePickers'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

const AddItem = ({ label, onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('#000000') // For 'New Goal'
  const [dueDate, setDueDate] = useState(null) // For 'New Task'

  const handleAdd = async () => {
    if (inputValue.trim()) {
      let attributes = null

      if (label === 'New Goal') {
        attributes = selectedCategory
      } else if (label === 'New Task') {
        attributes = dueDate
      }

      await onAdd(inputValue.trim(), attributes ?? null)
      setInputValue('')
      setSelectedCategory('#000000')
      setDueDate(null)
    }
  }

  // Conditionally render the category picker
  const getStartAdornment = () => {
    if (label === 'New Goal') {
      return (
        <CategoryPicker
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )
    } else if (label === 'New Task') {
      return <DateTimePicker value={dueDate} onChange={setDueDate} />
    }
    return null
  }

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
          startAdornment: getStartAdornment(),
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
