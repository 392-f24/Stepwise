// @ts-check

import AddItem from '@/components/Home/AddItem'
import MicroGoal from '@/components/Home/MicroGoal'
import ProgressIndicator from '@/components/Home/ProgressIndicator'
import { useUser } from '@/contexts/UserContext'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { calculateProgress } from '@/utils/calculateProgress'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Collapse,
  darken,
  IconButton,
  List,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const GoalDetails = () => {
  const [editGoalInput, setEditGoalInput] = useState(false)
  const { macroGoalIndex } = useParams()
  const { user } = useUser()
  const { addMicrogoal, updateGoal } = useGoalsUpdater()

  const macroGoal = user.goals[macroGoalIndex]
  const categoryColor = macroGoal.category || '#000'

  // @ts-ignore
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
          borderColor: categoryColor,
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          onClick={() => setEditGoalInput(!editGoalInput)} // Click to edit goal name
        >
          <ProgressIndicator value={progress} size={50} thickness={4} />
          <Typography variant='h5' sx={{ ml: 2, flexGrow: 1 }}>
            {macroGoal.name}
          </Typography>
          <IconButton
            aria-label='Edit Goal'
            onClick={() => setEditGoalInput(!editGoalInput)}
            sx={{ color: darken(categoryColor, 0.3) }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Collapse in={editGoalInput} timeout='auto' unmountOnExit>
          <AddItem
            label='Edit Goal'
            onAdd={(name, category) => {
              updateGoal(macroGoalIndex, name, category)
              setEditGoalInput(false)
            }}
            presetValue={macroGoal.name}
            presetCategory={categoryColor}
            sx={{ mt: 2 }}
          />
        </Collapse>
      </Paper>

      <AddItem
        label='New MicroGoal'
        onAdd={(microGoalName) => addMicrogoal(macroGoalIndex, microGoalName)}
      />

      <List sx={{ mt: 3 }}>
        {/* @ts-ignore */}
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
