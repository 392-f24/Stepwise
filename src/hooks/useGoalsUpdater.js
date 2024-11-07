import { useUser } from '@/contexts/UserContext'
import { updateStreakDays } from '@/utils/streakUtils'

const useGoalsUpdater = () => {
  const { user, updateProfile } = useUser()

  // Function to update both goals and optionally streak in the user profile
  const updateGoalsAndStreak = async (
    updatedGoals,
    message,
    countChange = 0
  ) => {
    try {
      // If countChange is not 0, update the streak days
      let updatedStreak = user.streak
      if (countChange !== 0) {
        updatedStreak = updateStreakDays(user, countChange)
      }

      // Combine the updated goals and streak
      const updatedProfile = {
        goals: updatedGoals,
        ...(countChange !== 0 && { streak: updatedStreak }),
      } // Only update streak if countChange is not 0

      // Update the user profile
      await updateProfile(updatedProfile)
      console.log(message)
    } catch (error) {
      console.error(`Error updating goals and streak: ${message}`, error)
    }
  }

  // Add a new goal, microgoal, or task
  const addItem = async (
    newItem,
    itemType,
    goalIndex = undefined,
    microGoalIndex = undefined
  ) => {
    const updatedGoals = [...user.goals]

    switch (itemType) {
      case 'goal':
        updatedGoals.push(newItem)
        break
      case 'microgoal':
        if (goalIndex === undefined) {
          console.error('Goal index is required for adding a microgoal')
          return
        }
        updatedGoals[goalIndex]?.microgoals.push(newItem)
        break
      case 'task':
        if (goalIndex === undefined || microGoalIndex === undefined) {
          console.error(
            'Both goal and microgoal indices are required for adding a task'
          )
          return
        }
        updatedGoals[goalIndex]?.microgoals[microGoalIndex]?.tasks.push(newItem)
        break
      default:
        console.error(`Unsupported item type: ${itemType}`)
        return
    }

    // Update profile with goals and success message
    await updateGoalsAndStreak(
      updatedGoals,
      `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added successfully.`
    )
  }

  // Toggle the expansion status of a goal or microgoal
  const toggleExpansion = async (goalIndex, microGoalIndex) => {
    const updatedGoals = [...user.goals]
    const target =
      microGoalIndex !== undefined
        ? updatedGoals[goalIndex].microgoals[microGoalIndex]
        : updatedGoals[goalIndex]
    target.expanded = !target.expanded
    await updateGoalsAndStreak(updatedGoals, 'Expansion toggled successfully.')
  }

  // Toggle the completion status of a task
  const toggleTaskCompletion = async (goalIndex, microgoalIndex, taskIndex) => {
    const updatedGoals = [...user.goals]
    const task =
      updatedGoals[goalIndex]?.microgoals[microgoalIndex]?.tasks[taskIndex]
    if (!task) {
      console.error('Specified goal, microgoal, or task does not exist')
      return
    }
    // Toggle the task completion status
    task.completed = !task.completed

    await updateGoalsAndStreak(
      updatedGoals,
      'Task completion status toggled successfully.',
      task.completed ? 1 : -1
    )
  }

  // Delete a goal, microgoal, or task
  const deleteItem = async ({
    goalIndex,
    microGoalIndex = undefined,
    taskIndex = undefined,
  }) => {
    const updatedGoals = [...user.goals]

    if (taskIndex !== undefined) {
      updatedGoals[goalIndex]?.microgoals[microGoalIndex]?.tasks.splice(
        taskIndex,
        1
      )
    } else if (microGoalIndex !== undefined) {
      updatedGoals[goalIndex]?.microgoals.splice(microGoalIndex, 1)
    } else if (goalIndex !== undefined) {
      updatedGoals.splice(goalIndex, 1)
    }

    await updateGoalsAndStreak(updatedGoals, 'Item deleted successfully.')
  }

  return {
    addGoal: (goalName, category) =>
      addItem(
        {
          name: goalName,
          category: category, // Store only category name
          expanded: false,
          microgoals: [],
        },
        'goal'
      ),
    addMicrogoal: (goalIndex, microGoalName) =>
      addItem(
        { name: microGoalName, expanded: false, tasks: [] },
        'microgoal',
        goalIndex
      ),
    addTask: (goalIndex, microGoalIndex, taskName) =>
      addItem(
        { name: taskName, completed: false },
        'task',
        goalIndex,
        microGoalIndex
      ),

    // Delete
    deleteItem,
    toggleTaskCompletion,

    toggleGoalExpansion: (goalIndex) => toggleExpansion(goalIndex),
    toggleMicroGoalExpansion: (goalIndex, microGoalIndex) =>
      toggleExpansion(goalIndex, microGoalIndex),
  }
}

export default useGoalsUpdater
