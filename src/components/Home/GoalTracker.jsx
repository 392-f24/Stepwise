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
    <ListItemText primary={task.title} />
  </ListItem>
);

const MicroGoal = ({ microGoal, onToggleTask, onToggleExpand }) => {
  const progress =
    (microGoal.tasks.filter((t) => t.completed).length / microGoal.tasks.length) * 100;

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
      <Box display="flex" alignItems="center">
        <ProgressIndicator value={progress} size={32} thickness={3} />
        <Typography variant="subtitle1">{microGoal.title}</Typography>
        <IconButton onClick={() => onToggleExpand(microGoal.id)} size="small" sx={{ ml: 'auto' }}>
          {microGoal.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {microGoal.expanded && (
        <List sx={{ mt: 1, pl: 4 }}>
          {microGoal.tasks.map((task) => (
            <Task key={task.id} task={task} onToggle={() => onToggleTask(microGoal.id, task.id)} />
          ))}
        </List>
      )}
    </Paper>
  );
};

const MacroGoal = ({ macroGoal, onToggleTask, onToggleExpand }) => {
  const progress =
    (macroGoal.microGoals.reduce((acc, mg) => acc + mg.tasks.filter((t) => t.completed).length, 0) /
      macroGoal.microGoals.reduce((acc, mg) => acc + mg.tasks.length, 0)) *
    100;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <ProgressIndicator value={progress} size={48} thickness={4} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {macroGoal.title}
        </Typography>
        <IconButton onClick={() => onToggleExpand(macroGoal.id)} size="small" sx={{ ml: 'auto' }}>
          {macroGoal.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {macroGoal.expanded && (
        <List sx={{ pl: 2 }}>
          {macroGoal.microGoals.map((microGoal) => (
            <MicroGoal
              key={microGoal.id}
              microGoal={microGoal}
              onToggleTask={(microGoalId, taskId) =>
                onToggleTask(macroGoal.id, microGoalId, taskId)
              }
              onToggleExpand={(microGoalId) => onToggleExpand(macroGoal.id, microGoalId)}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default function GoalTracker() {
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Improve Coding Skills',
      expanded: true,
      microGoals: [
        {
          id: '1-1',
          title: 'Learn React',
          expanded: true,
          tasks: [
            { id: '1-1-1', title: 'Complete React tutorial', completed: true },
            { id: '1-1-2', title: 'Build a small project', completed: false },
          ],
        },
        {
          id: '1-2',
          title: 'Master JavaScript',
          expanded: false,
          tasks: [
            { id: '1-2-1', title: 'Study ES6+ features', completed: false },
            { id: '1-2-2', title: 'Practice coding challenges', completed: false },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Get Fit',
      expanded: false,
      microGoals: [
        {
          id: '2-1',
          title: 'Cardio',
          expanded: false,
          tasks: [
            { id: '2-1-1', title: 'Run 5k', completed: false },
            { id: '2-1-2', title: 'Swim 1k', completed: false },
          ],
        },
        {
          id: '2-2',
          title: 'Strength Training',
          expanded: false,
          tasks: [
            { id: '2-2-1', title: 'Bench press 100lbs', completed: false },
            { id: '2-2-2', title: 'Squat 150lbs', completed: false },
          ],
        },
      ],
    },
  ]);

  const handleToggleTask = (macroGoalId, microGoalId, taskId) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal) =>
        macroGoal.id === macroGoalId
          ? {
              ...macroGoal,
              microGoals: macroGoal.microGoals.map((microGoal) =>
                microGoal.id === microGoalId
                  ? {
                      ...microGoal,
                      tasks: microGoal.tasks.map((task) =>
                        task.id === taskId ? { ...task, completed: !task.completed } : task,
                      ),
                    }
                  : microGoal,
              ),
            }
          : macroGoal,
      ),
    );
  };

  const handleToggleExpand = (macroGoalId, microGoalId) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal) =>
        macroGoal.id === macroGoalId
          ? microGoalId
            ? {
                ...macroGoal,
                microGoals: macroGoal.microGoals.map((microGoal) =>
                  microGoal.id === microGoalId
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
      {goals.map((macroGoal) => (
        <MacroGoal
          key={macroGoal.id}
          macroGoal={macroGoal}
          onToggleTask={handleToggleTask}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </Box>
  );
}
