import AddItem from '@/components/Home/AddItem'
import DeleteItem from '@/components/Home/DeleteItem'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import Task from '@/components/Home/Task'
import TaskCompletionModal from '@/components/Home/TaskCompletionModal'
import { useUser } from '@/contexts/UserContext'
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
import { useState } from 'react'

const MicroGoal = ({ microGoal, macroGoalIndex, microGoalIndex }) => {
  const { addTask, toggleExpansion, toggleTaskCompletion } = useGoalsUpdater()
  const progress = calculateProgress([microGoal])
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useUser()

  // Access today's task completion count
  const todayCount = user?.streak?.todayCount || 0

  const handleTaskCompletion = (macroGoalIndex, microGoalIndex, taskIndex) => {
    toggleTaskCompletion(macroGoalIndex, microGoalIndex, taskIndex)
    setModalOpen(true) // Open the modal after each task completion
  }

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
                handleTaskCompletion(macroGoalIndex, microGoalIndex, taskIndex)
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

      {/* TaskCompletionModal */}
      <TaskCompletionModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        count={todayCount} // Pass today's task completion count to the modal
      />
    </Paper>
  )
}

export default MicroGoal
