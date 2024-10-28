import { useUser } from '@contexts/UserContext';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const ProgressIndicator = ({ value, size = 40, thickness = 4 }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
    <CircularProgress variant="determinate" value={value} size={size} thickness={thickness} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

const Task = ({ task, onToggle }) => (
  <ListItem dense>
    <Checkbox edge="start" checked={task.completed} onChange={onToggle} />
    <ListItemText primary={task.name} />
  </ListItem>
);

const MicroGoal = ({ microGoal, macroGoalIndex, microGoalIndex, onToggleTask, onToggleExpand }) => {
  const progress =
    (microGoal.tasks.filter((t) => t.completed).length / microGoal.tasks.length) * 100;

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
        <List sx={{ mt: 1, pl: 4 }}>
          {microGoal.tasks.map((task, taskIndex) => (
            <Task
              key={`${macroGoalIndex}-${microGoalIndex}-${taskIndex}`} // Unique key for tasks
              task={task}
              onToggle={() => onToggleTask(macroGoalIndex, microGoalIndex, taskIndex)}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

const MacroGoal = ({ macroGoal, macroGoalIndex, onToggleTask, onToggleExpand }) => {
  const progress =
    (macroGoal.microgoals.reduce((acc, mg) => acc + mg.tasks.filter((t) => t.completed).length, 0) /
      macroGoal.microgoals.reduce((acc, mg) => acc + mg.tasks.length, 0)) *
    100;

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
      <Divider sx={{ mb: 2 }} />
      {macroGoal.expanded && (
        <List sx={{ pl: 2 }}>
          {macroGoal.microgoals.map((microGoal, microGoalIndex) => (
            <MicroGoal
              key={`${macroGoalIndex}-${microGoalIndex}`} // Unique key for microgoals
              microGoal={microGoal}
              macroGoalIndex={macroGoalIndex}
              microGoalIndex={microGoalIndex} // Pass the micro goal index
              onToggleTask={onToggleTask}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default function GoalTracker() {
  const { user, loading } = useUser();
  const [goals, setGoals] = useState(user.goals || []);

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

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', pt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        goals.map((macroGoal, macroGoalIndex) => (
          <MacroGoal
            key={macroGoalIndex} // Use the index as the key
            macroGoal={macroGoal}
            macroGoalIndex={macroGoalIndex} // Pass the index
            onToggleTask={handleToggleTask}
            onToggleExpand={handleToggleExpand}
          />
        ))
      )}
    </Box>
  );
}
