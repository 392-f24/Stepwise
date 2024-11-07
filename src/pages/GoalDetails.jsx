import AddItem from '@/components/Home/AddItem'
import MicroGoal from '@/components/Home/MicroGoal'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import { useUser } from '@/contexts/UserContext'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { calculateProgress } from '@/utils/calculateProgress'
import { Box, List, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const GoalDetails = () => {
  const { macroGoalIndex } = useParams()
  const { user } = useUser()
  const { addMicrogoal } = useGoalsUpdater()

  const macroGoal = user.goals[macroGoalIndex]
  const progress = calculateProgress(macroGoal.microgoals)

  return (
    <Box sx={{ p: 4 }}>
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

      <AddItem
        label='New MicroGoal'
        onAdd={(microGoalName) => addMicrogoal(macroGoalIndex, microGoalName)}
      />

      <List sx={{ mt: 3 }}>
        {macroGoal.microgoals.map((microGoal, microGoalIndex) => (
          <MicroGoal
            key={microGoalIndex}
            microGoal={microGoal}
            macroGoalIndex={macroGoalIndex}
            microGoalIndex={microGoalIndex}
          />
        ))}
      </List>
    </Box>
  )
}

export default GoalDetails
