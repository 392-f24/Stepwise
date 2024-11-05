import { Box, CircularProgress, Typography } from '@mui/material'

const ProgressIndicator = ({ value, size = 40, thickness = 4 }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
    <CircularProgress
      variant='determinate'
      value={value}
      size={size}
      thickness={thickness}
      sx={{
        color: (theme) =>
          value >= 100
            ? theme.palette.success.main
            : `linear-gradient(to right, ${theme.palette.info.main}, ${theme.palette.warning.main})`,
        transition: 'all 0.4s ease-in-out', // Smooth transition effect
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant='caption'
        component='div'
        color={value >= 100 ? 'success.main' : 'text.secondary'}
        sx={{
          fontWeight: value >= 100 ? 'bold' : 'normal',
          fontSize: value >= 10 ? '0.75rem' : 'inherit',
        }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
)

export default ProgressIndicator
