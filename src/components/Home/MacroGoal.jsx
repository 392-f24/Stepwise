import AddItem from '@components/Home/AddItem';
import DeleteItem from '@components/Home/DeleteItem';
import MicroGoal from '@components/Home/MicroGoal';
import ProgressIndicator from '@components/Home/ProgressIndicator';
import useGoalsUpdater from '@hooks/useGoalsUpdater';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Divider, IconButton, List, Paper, Typography } from '@mui/material';
import { calculateProgress } from '@utils/calculateProgress';

const MacroGoal = ({ macroGoal, macroGoalIndex }) => {
  const { addMicrogoal, toggleGoalExpansion, deleteGoal } = useGoalsUpdater();
  const progress = calculateProgress(macroGoal.microgoals);

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center">
        <ProgressIndicator value={progress} size={40} thickness={3} />
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          {macroGoal.name}
        </Typography>
        <DeleteItem deleteFunction={deleteGoal} goalIndex={macroGoalIndex} />
        <IconButton onClick={() => toggleGoalExpansion(macroGoalIndex)} size="small">
          {macroGoal.expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={macroGoal.expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 1 }} />
        <AddItem
          label="New Microgoal"
          onAdd={(microGoalName) => addMicrogoal(macroGoalIndex, microGoalName)}
        />
        <List>
          {macroGoal.microgoals.map((microGoal, microGoalIndex) => (
            <MicroGoal
              key={microGoalIndex}
              microGoal={microGoal}
              macroGoalIndex={macroGoalIndex}
              microGoalIndex={microGoalIndex}
            />
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

export default MacroGoal;
