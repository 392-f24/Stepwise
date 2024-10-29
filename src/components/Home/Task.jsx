import { Checkbox, ListItem, ListItemText } from '@mui/material';

const Task = ({ task, onToggle }) => (
  <ListItem dense>
    <Checkbox edge="start" checked={task.completed} onChange={onToggle} />
    <ListItemText primary={task.name} />
  </ListItem>
);

export default Task;
