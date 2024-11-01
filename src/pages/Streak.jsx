import FireIcon from '@mui/icons-material/Whatshot';
import { Box, Typography } from '@mui/material';
import '@styles/StreakPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Streak = () => {
  // Define the streak count and the hard-coded completed dates as strings
  const streakCount = 7;
  const completedDays = [
    '2024-10-18',
    '2024-10-19',
    '2024-10-22',
    '2024-10-23',
    '2024-10-24',
    '2024-10-25',
    '2024-10-26',
    '2024-10-27',
    '2024-10-28',
  ];

  // Get today's date for comparison
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {/* Display the large fire icon and streak count */}
      <FireIcon
        sx={{
          fontSize: 80,
          color: 'primary.dark',
          animation: 'burn-animation 1.5s infinite',
        }}
      />
      <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 3 }}>
        {streakCount} Day Streak
      </Typography>

      {/* Calendar with conditional fire icons */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Calendar
          tileContent={({ date, view }) => {
            const formattedDate = date.toISOString().split('T')[0];
            const isCompleted = completedDays.includes(formattedDate);
            const isPastOrToday = formattedDate <= todayString;

            return view === 'month' && isPastOrToday ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FireIcon
                  sx={{
                    fontSize: 16,
                    color: isCompleted ? 'primary.main' : 'gray', // Orange if completed, grey otherwise
                    animation: isCompleted ? 'burn-animation 2s infinite' : 'none',
                  }}
                />
              </Box>
            ) : null;
          }}
        />
      </Box>
    </Box>
  );
};

export default Streak;
