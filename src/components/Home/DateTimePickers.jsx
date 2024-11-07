// @ts-check

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useRef, useState } from 'react'

export function DateTimePicker({
  value,
  onChange,
  label = 'Select date and time',
}) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const theme = useTheme()

  const toggleOpen = () => setOpen((prev) => !prev) // Toggle the open state

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: value ? theme.palette.primary.light : '#eeeeee',
          borderRadius: 2,
          marginRight: 1,
        }}
      >
        <IconButton ref={anchorRef} onClick={toggleOpen} aria-label={label}>
          <CalendarTodayIcon
            className='h-5 w-5'
            style={{
              color: value ? theme.palette.primary.dark : undefined,
            }}
          />
        </IconButton>
        <MUIDateTimePicker
          open={open}
          onClose={toggleOpen}
          onOpen={toggleOpen}
          value={value}
          onChange={onChange}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              sx: { display: 'none' },
            },
            popper: {
              anchorEl: anchorRef.current,
              placement: 'bottom-start',
              sx: { zIndex: 1300 },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}
