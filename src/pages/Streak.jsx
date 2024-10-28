import { Box, Typography, Grid } from '@mui/material';
import FireIcon from '@mui/icons-material/Whatshot';
import "@styles/StreakPage.css";
import { useTheme } from '@mui/material/styles';

// Days of the week headers
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Streak = () => {
  //  Hard coded streak days
  const streakCount = 7;
  const completedDays = [18, 19, 22, 23, 24, 25, 26, 27, 28];

  //month start and end dates
  const monthStart = new Date(2024, 9, 1);
  const monthEnd = new Date(2024, 9 + 1, 0);

  // Array to hold each day in October 2024 with the correct weekday alignment
  const daysInCalendar = [];
  const totalDays = monthEnd.getDate();
  const startDay = monthStart.getDay();

  // Adding empty cells for days before the month starts
  for (let i = 0; i < startDay; i++) {
    daysInCalendar.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    daysInCalendar.push({
      day,
      completed: completedDays.includes(day),
    });
  }
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <FireIcon
        sx={{
          fontSize: 120,
          color: "primary.dark",
          animation: 'burn-animation 1s infinite',
        }}
      />
      <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 3 }}>
        {streakCount} Day Streak
      </Typography>

      <Typography variant="body2" sx={{ mb: 1, fontSize: '1rem' }}>
        October 2024
      </Typography>



      {/* Days of the Week Headers */}
      <Grid container spacing={1} sx={{ maxWidth: 500, margin: 'auto' }}>
        {daysOfWeek.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container spacing={1} sx={{ maxWidth: 500, margin: 'auto' }}>
        {daysInCalendar.map((dayObj, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '50px', // Height of each calendar cell
              }}
            >
              {dayObj ? (
                <>
                  <Typography variant="caption">{dayObj.day}</Typography>
                  <FireIcon
                    sx={{
                      color: dayObj.completed ? "primary.main" : 'gray',
                      fontSize: 28,
                      animation: dayObj.completed ? 'burn-animation 3s infinite' : 'none',
                    }}
                  />
                </>
              ) : (
                <Typography variant="caption">&nbsp;</Typography> // Empty space for non-month dates
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Streak;
