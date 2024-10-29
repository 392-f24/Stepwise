import MicroGoal from '@components/Home/MicroGoal';
import ProgressIndicator from '@components/Home/ProgressIndicator';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const MacroGoal = ({
  macroGoal,
  macroGoalIndex,
  onToggleTask,
  onToggleExpand,
  onAddMicroGoal,
  onAddTask,
}) => {
  const completedTasks = macroGoal.microgoals.reduce(
    (acc, mg) => acc + mg.tasks.filter((t) => t.completed).length,
    0,
  );
  const totalTasks = macroGoal.microgoals.reduce((acc, mg) => acc + mg.tasks.length, 0);
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const { addMicrogoal } = useGoalsUpdater();
  const [newMicroGoalName, setNewMicroGoalName] = useState('');

  const handleAddMicroGoal = async () => {
    if (newMicroGoalName.trim()) {
      await addMicrogoal(macroGoalIndex, newMicroGoalName);
      onAddMicroGoal(macroGoalIndex, { name: newMicroGoalName, expanded: false, tasks: [] });
      setNewMicroGoalName('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <ProgressIndicator value={progress} size={48} thickness={4} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {macroGoal.name}
        </Typography>
        <IconButton onClick={() => onToggleExpand(macroGoalIndex)} size="small" sx={{ ml: 'auto' }}>
          {macroGoal.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {macroGoal.expanded && <Divider sx={{ mb: 2 }} />}
      {macroGoal.expanded && (
        <>
          <Box display="flex" mb={2}>
            <TextField
              variant="outlined"
              label="New Microgoal"
              value={newMicroGoalName}
              onChange={(e) => setNewMicroGoalName(e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <Button variant="contained" onClick={handleAddMicroGoal}>
              Add Microgoal
            </Button>
          </Box>
          <List sx={{ pl: 2 }}>
            {macroGoal.microgoals.map((microGoal, microGoalIndex) => (
              <MicroGoal
                key={`${macroGoalIndex}-${microGoalIndex}`}
                microGoal={microGoal}
                macroGoalIndex={macroGoalIndex}
                microGoalIndex={microGoalIndex}
                onToggleTask={onToggleTask}
                onToggleExpand={onToggleExpand}
                onAddTask={onAddTask}
              />
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default MacroGoal;
