import { Checkbox, ListItem, ListItemText } from '@mui/material';

const Task = ({ task, onToggle }) => (
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
      edge="start"
      checked={task.completed}
      onChange={onToggle}
      size="medium"
      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} // Enlarge the checkbox icon
    />
    <ListItemText
      primary={task.name}
      primaryTypographyProps={{
        sx: {
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'text.disabled' : 'text.primary',
        },
      }}
    />
  </ListItem>
);

export default Task;
