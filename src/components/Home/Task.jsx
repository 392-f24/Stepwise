// @ts-check

import DeleteItem from '@/components/Home/DeleteItem'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Box, Checkbox, Chip, ListItem, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
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
  const renderDueDateChip = () => {
    const theme = useTheme()
    const isOverdue =
      dayjs().isAfter(dayjs(task.due.toMillis())) && !task.completed

    return (
      <Chip
        icon={<AccessTimeIcon color='inherit' />}
        size='small'
        label={`${isOverdue ? 'Past' : 'Due'}: ${dayjs(task.due.toMillis()).calendar()}`}
        sx={{
          ...(isOverdue && {
            bgcolor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }),
        }}
      />
    )
  }

  return (
    <ListItem
      dense
      sx={{
        ...styles.listItem,
        bgcolor: task.completed ? 'action.hover' : 'inherit',
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
    padding: 1,
    mb: 1,
    '&:hover': { bgcolor: 'action.hover' },
  },
  primaryTextCompleted: {
    textDecoration: 'line-through',
    color: 'text.disabled',
  },
  textContainer: {
    marginLeft: 1,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'baseline', sm: 'center' },
    gap: '0.5rem',
  },
}

export default Task
