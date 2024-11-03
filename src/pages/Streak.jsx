import { useUser } from '@contexts/UserContext';
import FireIcon from '@mui/icons-material/Whatshot';
import { Box, Typography } from '@mui/material';
import '@styles/StreakPage.css';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Streak = () => {
  const { streakCount, completedDays, checkDailyProgress } = useUser();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    //check for daily progress based on goals or tasks whenever component mounts or updates
    checkDailyProgress();
  }, [checkDailyProgress]);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Calendar
          tileContent={({ date, view }) => {
            const formattedDate = date.toISOString().split('T')[0];
            const isCompleted = completedDays.includes(formattedDate);
            const isPastOrToday = formattedDate <= today;

            return view === 'month' && isPastOrToday ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FireIcon
                  sx={{
                    fontSize: 16,
                    color: isCompleted ? 'primary.main' : 'gray',
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
