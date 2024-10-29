import AddItem from '@components/Home/AddItem';
import MacroGoal from '@components/Home/MacroGoal';
import { useUser } from '@contexts/UserContext';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { Box } from '@mui/material';

export default function GoalTracker() {
  const { user } = useUser();
  const { addGoal } = useGoalsUpdater();

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <AddItem label="New Goal" onAdd={addGoal} />
      <Box sx={{ height: 16 }} />
      {user.goals.map((macroGoal, index) => (
        <MacroGoal key={index} macroGoal={macroGoal} macroGoalIndex={index} />
      ))}
    </Box>
  );
}
