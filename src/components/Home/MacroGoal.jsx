import MicroGoal from '@components/Home/MicroGoal';
import ProgressIndicator from '@components/Home/ProgressIndicator';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
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
import { calculateProgress } from '@utils/calculateProgress';
import { useState } from 'react';

const MacroGoal = ({ macroGoal, macroGoalIndex }) => {
  const { addMicrogoal, toggleGoalExpansion } = useGoalsUpdater();
  const [newMicroGoalName, setNewMicroGoalName] = useState('');
  const progress = calculateProgress(macroGoal.microgoals);

  const handleAddMicroGoal = async () => {
    if (newMicroGoalName.trim()) {
      await addMicrogoal(macroGoalIndex, newMicroGoalName);
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
        <IconButton
          onClick={() => toggleGoalExpansion(macroGoalIndex)}
          size="small"
          sx={{ ml: 'auto' }}
        >
          {macroGoal.expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      {macroGoal.expanded && (
        <>
          <Divider sx={{ mb: 2 }} />
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
                key={microGoalIndex}
                microGoal={microGoal}
                macroGoalIndex={macroGoalIndex}
                microGoalIndex={microGoalIndex}
              />
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default MacroGoal;
