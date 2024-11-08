// @ts-check

import { updateStreakDays } from '@/utils/streakUtils'

export const updateGoalsAndStreak = async (
  userContext,
  updatedGoals,
  message = 'Update successful.',
  countChange = 0
) => {
  // Only update streak if countChange is non-zero
  const updatedProfile = {
    goals: updatedGoals,
    ...(countChange !== 0 && {
      streak: updateStreakDays(userContext.user, countChange),
    }),
  }

  try {
    await userContext.updateProfile(updatedProfile)
    console.log(message)
  } catch (error) {
    console.error(`Error updating goals and streak: ${message}`, error)
  }
}
