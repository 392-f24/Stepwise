import { useUser } from '@contexts/UserContext';
import useGoalsManager from '@hooks/useGoalsUpdater';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
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

  const { addTask } = useGoalsManager();
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

  const { addMicrogoal } = useGoalsManager();
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

export default function GoalTracker() {
  const { user, loading } = useUser();
  const { addGoal } = useGoalsManager();
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
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}
