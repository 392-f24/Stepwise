import { useUser } from '@/contexts/UserContext'
import '@/styles/StreakPage.css'
import { getChicagoDate } from '@/utils/streakUtils'
import FireIcon from '@mui/icons-material/Whatshot'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Streak = () => {
  const { user } = useUser()

  const streakCount = user.streak?.count || 0
  const completedDays = user.streak?.completedDays || {}
  const today = getChicagoDate()

  // Cache the completed dates
  const completedDatesSet = useMemo(
    () =>
      new Set(
        Object.keys(completedDays).filter((date) => completedDays[date] > 0)
      ),
    [completedDays]
  )

  // Function to get the tile icon for a date
  const getTileIcon = (date) => {
    const formattedDate = date.toISOString().split('T')[0]
    const isCompleted = completedDatesSet.has(formattedDate)
    const isPastOrToday = formattedDate <= today

    if (isPastOrToday) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FireIcon
            sx={{
              fontSize: 16,
              color: isCompleted ? 'primary.main' : 'gray',
              animation: isCompleted ? 'burn-animation 2s infinite' : 'none',
            }}
          />
        </Box>
      )
    }
    return null
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <FireIcon
        sx={{
          fontSize: 80,
          color: 'primary.dark',
          animation: 'burn-animation 1.5s infinite',
        }}
      />
      <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 2, mb: 3 }}>
        {streakCount} Day Streak
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Calendar
          tileContent={({ date, view }) =>
            view === 'month' ? getTileIcon(date) : null
          }
        />
      </Box>
    </Box>
  )
}

export default Streak
