// @ts-check

import { updateStreakDays } from '@/utils/streakUtils'

export const updateGoalsAndStreak = async (
  userContext,
  updatedGoals,
  message = 'Update successful.',
  countChange = 0
) => {
  const updatedStreak =
    countChange !== 0
      ? updateStreakDays(userContext.user, countChange)
      : userContext.user.streak
  const updatedProfile = {
    goals: updatedGoals,
    ...(countChange !== 0 && { streak: updatedStreak }),
  }

  try {
    await userContext.updateProfile(updatedProfile)
    console.log(message)
  } catch (error) {
    console.error(`Error updating goals and streak: ${message}`, error)
  }
}
