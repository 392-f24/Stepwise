import DeleteItem from '@/components/Home/DeleteItem'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import { calculateProgress } from '@/utils/calculateProgress'
import { Box, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MacroGoal = ({ macroGoal, macroGoalIndex }) => {
  const progress = calculateProgress(macroGoal.microgoals)
  const navigate = useNavigate()

  const handleNavigateToMicroGoals = () => {
    navigate(`/goals/${macroGoalIndex}`)
  }

  const handleDeleteClick = (event) => {
    event.stopPropagation() // Prevents the onClick from triggering navigation
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box
        display='flex'
        alignItems='center'
        onClick={handleNavigateToMicroGoals}
        sx={{ cursor: 'pointer' }}
      >
        <ProgressIndicator value={progress} size={40} thickness={3} />
        <Typography variant='h6' sx={{ flexGrow: 1, ml: 2 }}>
          {macroGoal.name}
        </Typography>
        <div onClick={handleDeleteClick} sx={{ display: 'inline-flex' }}>
          <DeleteItem goalIndex={macroGoalIndex} />
        </div>
      </Box>
    </Paper>
  )
}

export default MacroGoal
