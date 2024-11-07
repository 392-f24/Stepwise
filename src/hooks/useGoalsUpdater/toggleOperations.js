// @ts-check

import { updateGoalsAndStreak } from './updateHelpers'

export const toggleTaskCompletion = async (
  userContext,
  goalIndex,
  microGoalIndex,
  taskIndex
) => {
  const updatedGoals = [...userContext.user.goals]
  const task =
    updatedGoals[goalIndex]?.microgoals[microGoalIndex]?.tasks[taskIndex]
  task.completed = !task.completed
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Task completion toggled successfully.',
    task.completed ? 1 : -1
  )
}

export const toggleExpansion = async (
  userContext,
  goalIndex,
  microGoalIndex = undefined
) => {
  const updatedGoals = [...userContext.user.goals]
  const target =
    microGoalIndex !== undefined
      ? updatedGoals[goalIndex].microgoals[microGoalIndex]
      : updatedGoals[goalIndex]
  target.expanded = !target.expanded
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Expansion toggled successfully.'
  )
}
