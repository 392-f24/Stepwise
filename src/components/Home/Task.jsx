import DeleteItem from '@/components/Home/DeleteItem'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Box, Checkbox, Chip, ListItem, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

const Task = ({
  task,
  onToggle,
  macroGoalIndex,
  microGoalIndex,
  taskIndex,
}) => {
  dayjs.extend(calendar)

  return (
    <ListItem
      dense
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        bgcolor: task.completed ? 'action.hover' : 'background.paper',
        borderRadius: 1,
        mb: 1,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Checkbox
        edge='start'
        checked={task.completed}
        onChange={onToggle}
        size='medium'
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} // Enlarge the checkbox icon
      />
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {task.name}
            {task.due != undefined ? (
              <Chip
                icon={<AccessTimeIcon />}
                size='small'
                label={`Due: ${dayjs(task.due.toMillis()).calendar()}`}
              />
            ) : (
              <></>
            )}
          </Box>
        }
        primaryTypographyProps={{
          sx: {
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.disabled' : 'text.primary',
          },
        }}
      />
      <DeleteItem
        goalIndex={macroGoalIndex}
        microGoalIndex={microGoalIndex}
        taskIndex={taskIndex}
      />
    </ListItem>
  )
}

export default Task
