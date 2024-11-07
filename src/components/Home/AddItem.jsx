import CategoryPicker from '@/components/Home/CategoryPicker'
import { Box, TextField } from '@mui/material'
import { useState } from 'react'
import { DateTimePicker } from '../common/DateTimePickers'

const AddItem = ({ label, onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('#000000')
  const [dueDate, setDueDate] = useState(null)

  const handleAdd = async () => {
    if (inputValue.trim()) {
      let attributes = {
        category: label === 'New Goal' ? selectedCategory : null,
        dueDate: dueDate,
      }

      await onAdd(inputValue.trim(), attributes)
      setInputValue('')
      setSelectedCategory('#000000')
      setDueDate(null)
    }
  }

  // Conditionally render the category picker
  const startAdornment =
    label === 'New Goal' ? (
      <CategoryPicker
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    ) : label === 'New Task' ? (
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#eeeeee',
          borderRadius: '0.25rem',
          marginRight: '0.5rem',
        }}
      >
        <DateTimePicker
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
        />
      </Box>
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
        },
      }}
    />
  )
}

export default AddItem
