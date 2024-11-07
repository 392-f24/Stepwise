import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const AddItem = ({ label, onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('#000000') // Default color is black

  // Hardcoded color categories
  const colors = [
    '#FF6F61',
    '#FFD700',
    '#00CED1',
    '#B57EDC',
    '#98FF98',
    '#FFAB91',
    '#87CEEB',
    '#FFD59A',
    '#FFB6C1',
    '#8FBC8F',
    '#E6E6FA',
    '#4682B4',
    '#AAF0D1',
    '#FF7F50',
    '#DA70D6',
  ]
  const handleAdd = async () => {
    if (inputValue.trim()) {
      const item =
        label === 'New Goal'
          ? { text: inputValue, category: selectedCategory }
          : inputValue
      await onAdd(item)
      setInputValue('')
      setSelectedCategory('#000000') // Reset after adding
    }
  }

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <TextField
        variant='outlined'
        label={label}
        placeholder={label === 'New Goal' ? 'New Goal' : ''} // Add placeholder only for "New Goal"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        fullWidth
        slotProps={{
          input: {
            startAdornment:
              label === 'New Goal' ? ( // Show color picker only if label is "New Goal"
                <InputAdornment position='start' sx={{ marginRight: 1 }}>
                  <FormControl sx={{ minWidth: 36 }}>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      displayEmpty
                      sx={{
                        width: 60,
                        height: 30,
                        padding: 0,
                        '.MuiSelect-select': {
                          display: 'flex',
                          alignItems: 'center',
                          padding: 0,
                        },
                      }}
                      renderValue={(value) => (
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: value || '#000000',
                            margin: '0 auto',
                          }}
                        />
                      )}
                    >
                      {colors.map((color, index) => (
                        <MenuItem key={index} value={color}>
                          <Box display='flex' alignItems='center'>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: color,
                                marginRight: 1,
                              }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputAdornment>
              ) : null,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  color='primary'
                  onClick={handleAdd}
                  disabled={
                    !inputValue.trim() ||
                    (label === 'New Goal' && !selectedCategory)
                  }
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  )
}

export default AddItem
