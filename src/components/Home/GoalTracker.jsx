import MacroGoal from '@components/Home/MacroGoal';
import { useUser } from '@contexts/UserContext';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function GoalTracker() {
  const { user } = useUser();
  const { addGoal } = useGoalsUpdater();
  const [newGoalName, setNewGoalName] = useState('');

  const handleAddGoal = async () => {
    if (newGoalName.trim()) {
      await addGoal(newGoalName);
      setNewGoalName('');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', pt: 4 }}>
      <Box display="flex" mb={3}>
        <TextField
          variant="outlined"
          label="New Goal"
          value={newGoalName}
          onChange={(e) => setNewGoalName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddGoal} sx={{ ml: 2 }}>
          Add Goal
        </Button>
      </Box>
      {user.goals.map((macroGoal, index) => (
        <MacroGoal key={index} macroGoal={macroGoal} macroGoalIndex={index} />
      ))}
    </Box>
  );
}
