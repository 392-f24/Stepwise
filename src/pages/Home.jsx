import AddItem from '@/components/Home/AddItem'
import MacroGoal from '@/components/Home/MacroGoal'
import { useUser } from '@/contexts/UserContext'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { Box } from '@mui/material'

const Home = () => {
  const { user } = useUser()
  const { addGoal } = useGoalsUpdater()

  const handleAddGoal = async (goal) => {
    if (goal.text && goal.category) {
      await addGoal(goal.text, goal.category) // Pass goal name and category name to addGoal
    } else {
      console.error('Goal name or category is missing')
    }
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <AddItem label='New Goal' onAdd={handleAddGoal} />

      {/* Render existing goals */}
      <Box sx={{ mt: 2 }}>
        {user.goals.map((goal, index) => {
          const borderColor = goal.category ? goal.category : '#000'

          return (
            <Box
              key={index}
              sx={{
                borderLeft: `5px solid ${borderColor}`,
                paddingLeft: 2,
                mb: 2,
              }}
            >
              <MacroGoal key={index} macroGoal={goal} macroGoalIndex={index} />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Home
