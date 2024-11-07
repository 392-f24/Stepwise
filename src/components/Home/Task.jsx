// @ts-check

import DeleteItem from '@/components/Home/DeleteItem'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Box, Checkbox, Chip, ListItem, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

const Task = ({
  task,
  onToggle,
  macroGoalIndex,
  microGoalIndex,
  taskIndex,
}) => {
  const renderDueDateChip = () => (
    <Chip
      icon={<AccessTimeIcon />}
      size='small'
      label={`Due: ${dayjs(task.due.toMillis()).calendar()}`}
    />
  )

  return (
    <ListItem
      dense
      sx={{
        ...styles.listItem,
        bgcolor: task.completed ? 'action.hover' : styles.listItem.bgcolor,
      }}
    >
      <Checkbox
        edge='start'
        checked={task.completed}
        onChange={onToggle}
        size='medium'
      />
      <ListItemText
        primary={
          <Box sx={styles.textContainer}>
            {task.name}
            {task.due ? renderDueDateChip() : null}
          </Box>
        }
        primaryTypographyProps={{
          sx: task.completed ? styles.primaryTextCompleted : {},
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

const styles = {
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 1,
    bgcolor: 'background.paper',
    borderRadius: 1,
    mb: 1,
    '&:hover': { bgcolor: 'action.hover' },
  },
  primaryTextCompleted: {
    textDecoration: 'line-through',
    color: 'text.disabled',
  },
  textContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'baseline', sm: 'center' },
    gap: '0.5rem',
  },
}

export default Task
