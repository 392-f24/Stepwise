import ProgressIndicator from '@components/Home/ProgressIndicator';
import Task from '@components/Home/Task';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Box, Button, IconButton, List, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const MicroGoal = ({
  microGoal,
  macroGoalIndex,
  microGoalIndex,
  onToggleTask,
  onToggleExpand,
  onAddTask,
}) => {
  const completedTasks = microGoal.tasks.filter((t) => t.completed).length;
  const totalTasks = microGoal.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0; // Check for totalTasks

  const { addTask } = useGoalsUpdater();
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = async () => {
    if (newTaskName.trim()) {
      await addTask(macroGoalIndex, microGoalIndex, newTaskName);
      onAddTask(macroGoalIndex, microGoalIndex, { name: newTaskName, completed: false });
      setNewTaskName('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
      <Box display="flex" alignItems="center">
        <ProgressIndicator value={progress} size={32} thickness={3} />
        <Typography variant="subtitle1">{microGoal.name}</Typography>
        <IconButton
          onClick={() => onToggleExpand(macroGoalIndex, microGoalIndex)}
          size="small"
          sx={{ ml: 'auto' }}
        >
          {microGoal.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {microGoal.expanded && (
        <>
          <List sx={{ mt: 1, pl: 4 }}>
            {microGoal.tasks.map((task, taskIndex) => (
              <Task
                key={`${macroGoalIndex}-${microGoalIndex}-${taskIndex}`}
                task={task}
                onToggle={() => onToggleTask(macroGoalIndex, microGoalIndex, taskIndex)}
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
