import { Box, CircularProgress, Typography } from '@mui/material';

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

export default ProgressIndicator;
