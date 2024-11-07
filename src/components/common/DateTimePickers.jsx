import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Button, IconButton, Popover } from '@mui/material'
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useRef, useState } from 'react'

export function DateTimePicker({
  value,
  onChange,
  label = 'Select date and time',
}) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='relative inline-block'>
        <IconButton ref={anchorRef} onClick={handleOpen} aria-label={label}>
          <CalendarTodayIcon
            className='h-5 w-5'
            style={value !== null ? { color: '#4E2A84' } : {}}
          />
        </IconButton>
        <MUIDateTimePicker
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
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
      </div>
    </LocalizationProvider>
  )
}

// TODO: Prevent user from picking date in the past
export function DatePicker({ value, onChange, label = 'Select date' }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClear = () => {
    onChange(null)
    handleClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='relative inline-block'>
        <IconButton ref={anchorRef} onClick={handleOpen} aria-label={label}>
          <CalendarTodayIcon
            className='h-5 w-5'
            style={value !== null ? { color: '#4E2A84' } : {}}
          />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className='p-4'>
            <DateCalendar
              value={value}
              onChange={(newValue) => {
                onChange(newValue)
                handleClose()
              }}
            />
            <div className='mt-4 flex justify-end'>
              <Button onClick={handleClear} color='secondary'>
                Clear
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    </LocalizationProvider>
  )
}

export function TimePicker({ value, onChange, label = 'Select time' }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClear = () => {
    onChange(null)
    handleClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='relative inline-block'>
        <IconButton ref={anchorRef} onClick={handleOpen} aria-label={label}>
          <AccessTimeIcon
            className='h-5 w-5'
            style={value !== null ? { color: '#4E2A84' } : {}}
          />
        </IconButton>
        {/* <MUITimePicker
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              sx: { display: 'none' },
            },
            popper: {
              anchorEl: anchorRef.current,
              placement: 'bottom-start',
              sx: { zIndex: 1300 },
            },
          }}
        /> */}
        <Popover
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className='p-4'>
            <MUITimePicker
              value={value}
              onChange={onChange}
              slotProps={{
                textField: {
                  sx: { width: '100%' },
                },
              }}
            />
            <div className='mt-4 flex justify-end'>
              <Button onClick={handleClear} color='secondary'>
                Clear
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    </LocalizationProvider>
  )
}
