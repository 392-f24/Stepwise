// @ts-check

import { Box, InputAdornment, MenuItem, Select } from '@mui/material'

const colors = [
  '#000000',
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

const ColorCircle = ({ color }) => (
  <Box
    sx={{
      width: 26,
      height: 26,
      borderRadius: '50%',
      backgroundColor: color,
    }}
    aria-label={`Color: ${color}`}
  />
)

const CategoryPicker = ({ selectedCategory, setSelectedCategory }) => (
  <InputAdornment position='start' sx={{ marginRight: 1 }}>
    <Select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      displayEmpty
      variant='standard' // no outline
      sx={{
        minWidth: 0,
        padding: 0,
        '&:before, &:after': { display: 'none' }, // no underline
      }}
      renderValue={(value) => <ColorCircle color={value} />}
    >
      {colors.map((color, index) => (
        <MenuItem
          key={index}
          value={color}
          sx={{
            display: 'inline-flex',
            width: 'auto',
            padding: 1,
          }}
        >
          <ColorCircle color={color} />
        </MenuItem>
      ))}
    </Select>
  </InputAdornment>
)

export default CategoryPicker
