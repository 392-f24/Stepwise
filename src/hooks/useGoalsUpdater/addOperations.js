// @ts-check

import { Timestamp } from 'firebase/firestore'
import { updateGoalsAndStreak } from './updateHelpers'

export const addGoal = async (userContext, goalName, category) => {
  const updatedGoals = [
    ...userContext.user.goals,
    { name: goalName, category, microgoals: [] },
  ]
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Goal added successfully.'
  )
}

export const addMicrogoal = async (userContext, goalIndex, microGoalName) => {
  const updatedGoals = [...userContext.user.goals]
  updatedGoals[goalIndex]?.microgoals.push({
    name: microGoalName,
    expanded: false,
    tasks: [],
  })
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Microgoal added successfully.'
  )
}

export const addTask = async (
  userContext,
  goalIndex,
  microGoalIndex,
  taskName,
  dueDate = null
) => {
  const updatedGoals = [...userContext.user.goals]
  const newTask = {
    name: taskName,
    completed: false,
    due: dueDate ? Timestamp.fromMillis(dueDate.valueOf()) : null,
  }
  updatedGoals[goalIndex]?.microgoals[microGoalIndex]?.tasks.push(newTask)
  await updateGoalsAndStreak(
    userContext,
    updatedGoals,
    'Task added successfully.'
  )
}
