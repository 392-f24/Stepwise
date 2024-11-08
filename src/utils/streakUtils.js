// @ts-check

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

/**
 * Gets the current date in Chicago timezone (formatted as YYYY-MM-DD).
 * @returns {string} The current Chicago date as a string in YYYY-MM-DD format
 */
export const getChicagoDate = () => {
  return dayjs().tz('America/Chicago').format('YYYY-MM-DD')
}

/**
 * Updates the completed days for a user based on the current date.
 * @param {import('@/contexts/UserContext').Streak} streak - The user's streak object.
 * @param {number} countChange - 1 or -1 to increment or decrement the count for the current date.
 * @returns {import('@/contexts/UserContext').Streak} The updated streak object.
 */
export const updateStreakDays = (streak, countChange) => {
  const currentDate = getChicagoDate()
  const completedDays = { ...streak.completedDays }

  // Update the count for the current date
  completedDays[currentDate] = Math.max(
    0,
    (completedDays[currentDate] || 0) + countChange
  )

  const { count, todayCount } = calculateStreakCount(completedDays)

  return {
    ...streak,
    completedDays,
    count,
    todayCount,
  }
}

/**
 * Calculates the current streak count based on completedDays.
 * @param {import ('@/contexts/UserContext').CompletedDays} completedDays - The user's completed days.
 * @returns {{ count: number, todayCount: number }} - The current date and streak count.
 */
export const calculateStreakCount = (completedDays) => {
  const today = getChicagoDate()
  const todayCount = completedDays[today] || 0
  // If the user completed a task today, the streak is at least 1
  let count = todayCount > 0 ? 1 : 0

  // Start from yesterday to avoid counting today twice
  let currentDate = dayjs(today).subtract(1, 'day').format('YYYY-MM-DD')
  while (completedDays[currentDate] > 0) {
    count++
    currentDate = dayjs(currentDate).subtract(1, 'day').format('YYYY-MM-DD')
  }

  return { count, todayCount }
}
