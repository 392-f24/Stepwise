import MacroGoal from '@components/Home/MacroGoal';
import { useUser } from '@contexts/UserContext';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function GoalTracker() {
  const { user } = useUser();
  const { addGoal, addMicrogoal, addTask, updateTaskStatus } = useGoalsUpdater();
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
      {user.goals.map((macroGoal, macroGoalIndex) => (
        <MacroGoal
          key={macroGoalIndex}
          macroGoal={macroGoal}
          macroGoalIndex={macroGoalIndex}
          onToggleTask={(microGoalIndex, taskIndex, completed) =>
            updateTaskStatus(macroGoalIndex, microGoalIndex, taskIndex, completed)
          }
          onToggleExpand={(microGoalIndex) => addMicrogoal(macroGoalIndex, microGoalIndex)}
          onAddMicroGoal={(microGoalName) => addMicrogoal(macroGoalIndex, microGoalName)}
          onAddTask={(microGoalIndex, taskName) =>
            addTask(macroGoalIndex, microGoalIndex, taskName)
          }
        />
      ))}
    </Box>
  );
}
