// @ts-check

import { updateGoalsAndStreak } from './updateHelpers'

export const deleteItem = async (
  userContext,
  { goalIndex, microGoalIndex = undefined, taskIndex = undefined }
) => {
  const updatedGoals = [...userContext.user.goals]
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
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Item deleted successfully.'
  )
}
