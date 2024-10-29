import MacroGoal from '@components/Home/MacroGoal';
import { useUser } from '@contexts/UserContext';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function GoalTracker() {
  const { user } = useUser();
  const { addGoal } = useGoalsUpdater();
  const [goals, setGoals] = useState(user.goals);

  const [newGoalName, setNewGoalName] = useState('');

  const handleToggleTask = (macroGoalIndex, microGoalIndex, taskIndex) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal, mgi) =>
        mgi === macroGoalIndex
          ? {
              ...macroGoal,
              microgoals: macroGoal.microgoals.map((microGoal, mgi) =>
                mgi === microGoalIndex
                  ? {
                      ...microGoal,
                      tasks: microGoal.tasks.map((task, ti) =>
                        ti === taskIndex ? { ...task, completed: !task.completed } : task,
                      ),
                    }
                  : microGoal,
              ),
            }
          : macroGoal,
      ),
    );
  };

  const handleToggleExpand = (macroGoalIndex, microGoalIndex) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal, mgi) =>
        mgi === macroGoalIndex
          ? microGoalIndex !== undefined
            ? {
                ...macroGoal,
                microgoals: macroGoal.microgoals.map((microGoal, mgi) =>
                  mgi === microGoalIndex
                    ? { ...microGoal, expanded: !microGoal.expanded }
                    : microGoal,
                ),
              }
            : { ...macroGoal, expanded: !macroGoal.expanded }
          : macroGoal,
      ),
    );
  };

  const handleAddGoal = async () => {
    if (newGoalName.trim()) {
      await addGoal(newGoalName);
      setGoals((prevGoals) => [
        ...prevGoals,
        { name: newGoalName, expanded: false, microgoals: [] },
      ]);
      setNewGoalName('');
    }
  };

  const handleAddMicroGoal = async (macroGoalIndex, newMicroGoal) => {
    setGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals[macroGoalIndex].microgoals.push(newMicroGoal);
      return updatedGoals;
    });
  };

  const handleAddTask = async (macroGoalIndex, microGoalIndex, newTask) => {
    setGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals[macroGoalIndex].microgoals[microGoalIndex].tasks.push(newTask);
      return updatedGoals;
    });
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
      {goals.map((macroGoal, macroGoalIndex) => (
        <MacroGoal
          key={macroGoalIndex} // Use the index as the key
          macroGoal={macroGoal}
          macroGoalIndex={macroGoalIndex} // Pass the index
          onToggleTask={handleToggleTask}
          onToggleExpand={handleToggleExpand}
          onAddMicroGoal={handleAddMicroGoal}
          onAddTask={handleAddTask}
        />
      ))}
    </Box>
  );
}
