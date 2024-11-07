import AddItem from '@/components/Home/AddItem'
import DeleteItem from '@/components/Home/DeleteItem'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import Task from '@/components/Home/Task'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { calculateProgress } from '@/utils/calculateProgress'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  Paper,
  Typography,
} from '@mui/material'

const MicroGoal = ({ microGoal, macroGoalIndex, microGoalIndex }) => {
  const { addTask, toggleExpansion, toggleTaskCompletion } = useGoalsUpdater()
  const progress = calculateProgress([microGoal])

  return (
    <Paper
      elevation={5}
      sx={{ p: 1, mb: 2, bgcolor: 'background.default', borderRadius: 1 }}
    >
      <Box display='flex' alignItems='center'>
        <ProgressIndicator value={progress} size={40} thickness={3} />
        <Typography variant='subtitle1' sx={{ flexGrow: 1, ml: 1 }}>
          {microGoal.name}
        </Typography>
        <DeleteItem
          goalIndex={macroGoalIndex}
          microGoalIndex={microGoalIndex}
        />
        <IconButton
          onClick={() => toggleExpansion(macroGoalIndex, microGoalIndex)}
          size='small'
        >
          {microGoal.expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={microGoal.expanded} timeout='auto' unmountOnExit>
        <Divider sx={{ mt: 2 }} />
        <List sx={{ pl: 2, pb: 3 }}>
          {microGoal.tasks.map((task, taskIndex) => (
            <Task
              key={taskIndex}
              task={task}
              macroGoalIndex={macroGoalIndex}
              microGoalIndex={microGoalIndex}
              taskIndex={taskIndex}
              onToggle={() =>
                toggleTaskCompletion(macroGoalIndex, microGoalIndex, taskIndex)
              }
            />
          ))}
        </List>
        <AddItem
          label='New Task'
          onAdd={(taskName, dueDate) =>
            addTask(macroGoalIndex, microGoalIndex, taskName, dueDate)
          }
        />
      </Collapse>
    </Paper>
  )
}

export default MicroGoal
