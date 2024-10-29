import GoalTracker from '@components/Home/GoalTracker';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
      <GoalTracker />
    </Box>
  );
};

export default Home;
