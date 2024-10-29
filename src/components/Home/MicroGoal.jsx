import ProgressIndicator from '@components/Home/ProgressIndicator';
import Task from '@components/Home/Task';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, IconButton, List, Paper, TextField, Typography } from '@mui/material';
import { calculateProgress } from '@utils/calculateProgress';
import { useState } from 'react';

const MicroGoal = ({ microGoal, macroGoalIndex, microGoalIndex }) => {
  const { addTask, toggleMicroGoalExpansion, toggleTaskCompletion } = useGoalsUpdater();
  const progress = calculateProgress([microGoal]);
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = async () => {
    if (newTaskName.trim()) {
      await addTask(macroGoalIndex, microGoalIndex, newTaskName);
      setNewTaskName('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
      <Box display="flex" alignItems="center">
        <ProgressIndicator value={progress} size={32} thickness={3} />
        <Typography variant="subtitle1">{microGoal.name}</Typography>
        <IconButton
          onClick={() => toggleMicroGoalExpansion(macroGoalIndex, microGoalIndex)}
          size="small"
          sx={{ ml: 'auto' }}
        >
          {microGoal.expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      {microGoal.expanded && (
        <>
          <List sx={{ mt: 1, pl: 4 }}>
            {microGoal.tasks.map((task, taskIndex) => (
              <Task
                key={taskIndex}
                task={task}
                onToggle={() => toggleTaskCompletion(macroGoalIndex, microGoalIndex, taskIndex)}
              />
            ))}
          </List>
          <Box display="flex" mt={2}>
            <TextField
              variant="outlined"
              label="New Task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddTask} sx={{ ml: 1 }}>
              Add Task
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default MicroGoal;
