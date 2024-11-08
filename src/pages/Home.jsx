import AddItem from '@/components/Home/AddItem'
import MacroGoal from '@/components/Home/MacroGoal'
import { useUser } from '@/contexts/UserContext'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { Box } from '@mui/material'

const Home = () => {
  const { user } = useUser()
  const { addGoal } = useGoalsUpdater()

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <AddItem label='New Goal' onAdd={addGoal} />

      {/* Render existing goals */}
      <Box sx={{ mt: 2 }}>
        {user.goals.map((goal, index) => (
          <Box
            key={index}
            sx={{
              borderLeft: `5px solid ${goal.category || '#000'}`,
              paddingLeft: 2,
              mb: 2,
            }}
          >
            <MacroGoal macroGoal={goal} macroGoalIndex={index} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Home
