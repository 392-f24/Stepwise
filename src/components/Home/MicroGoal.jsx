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
  IconButton,
  List,
  Paper,
  Typography,
} from '@mui/material'

const MicroGoal = ({ microGoal, macroGoalIndex, microGoalIndex }) => {
  const { addTask, toggleMicroGoalExpansion, toggleTaskCompletion } =
    useGoalsUpdater()
  const progress = calculateProgress([microGoal])

  return (
    <Paper
      elevation={1}
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
          onClick={() =>
            toggleMicroGoalExpansion(macroGoalIndex, microGoalIndex)
          }
          size='small'
        >
          {microGoal.expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={microGoal.expanded} timeout='auto' unmountOnExit>
        <List sx={{ pl: 2 }}>
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
          onAdd={(taskName) =>
            addTask(macroGoalIndex, microGoalIndex, taskName)
          }
        />
      </Collapse>
    </Paper>
  )
}

export default MicroGoal
