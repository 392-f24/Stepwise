import AddItem from '@/components/Home/AddItem'
import CategoryPicker from '@/components/Home/CategoryPicker'
import MacroGoal from '@/components/Home/MacroGoal'
import { useUser } from '@/contexts/UserContext'
import useGoalsUpdater from '@/hooks/useGoalsUpdater'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const Home = () => {
  const { user } = useUser()
  const { addGoal, updateGoalCategory } = useGoalsUpdater()
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null)

  // Function to handle click outside of CategoryPicker, goal container, color menu
  const handleClickOutside = (event) => {
    if (
      !event.target.closest('.category-picker') &&
      !event.target.closest('.goal-container') &&
      !event.target.closest('.color-menu')
    ) {
      setEditingCategoryIndex(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCategoryClick = (index) => {
    setEditingCategoryIndex(index)
  }

  const handleCategoryChange = (newCategory) => {
    if (editingCategoryIndex !== null) {
      updateGoalCategory(editingCategoryIndex, newCategory)
      setEditingCategoryIndex(null)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <AddItem label='New Goal' onAdd={addGoal} />

      {/* Render existing goals */}
      <Box sx={{ mt: 2 }}>
        {user.goals.map((goal, index) => (
          <Box
            key={index}
            className='goal-container'
            sx={{
              borderLeft: `5px solid ${goal.category || '#000'}`,
              paddingLeft: 2,
              mb: 2,
            }}
            onClick={() => handleCategoryClick(index)}
          >
            <MacroGoal macroGoal={goal} macroGoalIndex={index} />

            {/* Conditionally render CategoryPicker when category is being edited */}
            {editingCategoryIndex === index && (
              <div className='category-picker'>
                <CategoryPicker
                  selectedCategory={goal.category}
                  setSelectedCategory={handleCategoryChange}
                />
              </div>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Home
