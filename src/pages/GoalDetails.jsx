import AddItem from '@/components/Home/AddItem'
import MicroGoal from '@/components/Home/MicroGoal'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { calculateProgress } from '@/utils/calculateProgress'
import { Box, CircularProgress, List, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const GoalDetails = () => {
  const { macroGoalIndex } = useParams()
  const { goals, addMicrogoal } = useGoalsUpdater()

  // Check if goals are loaded and the specific goal exists
  if (!goals || !goals[macroGoalIndex]) {
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  const macroGoal = goals[macroGoalIndex]
  const progress = calculateProgress(macroGoal.microgoals)

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: '2px solid',
          borderColor: macroGoal.category ? macroGoal.category : '#000',
        }}
      >
        <Box display='flex' alignItems='center'>
          <ProgressIndicator value={progress} size={50} thickness={4} />
          <Typography variant='h5' sx={{ ml: 2 }}>
            {macroGoal.name}
          </Typography>
        </Box>
      </Paper>

      <List>
        {macroGoal.microgoals.map((microGoal, microGoalIndex) => (
          <MicroGoal
            key={microGoalIndex}
            microGoal={microGoal}
            macroGoalIndex={macroGoalIndex}
            microGoalIndex={microGoalIndex}
          />
        ))}
      </List>

      <AddItem
        label='New MicroGoal'
        onAdd={(microGoalName) => addMicrogoal(macroGoalIndex, microGoalName)}
      />
    </Box>
  )
}

export default GoalDetails
