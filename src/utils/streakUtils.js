// @ts-check
import dayjs from 'dayjs'

/**
 * Gets the current date in Chicago timezone (formatted as YYYY-MM-DD).
 * @returns {string} The current Chicago date as a string in YYYY-MM-DD format
 */
export const getChicagoDate = () => {
  const chicagoTimeOffset = -6 * 60 // CST is UTC-6
  const chicagoDate = new Date(
    new Date().getTime() + chicagoTimeOffset * 60 * 1000
  )
  return chicagoDate.toISOString().split('T')[0]
}

/**
 * Completed days map with date-count pairs.
 * @typedef {Object} completedDays
 * @property {string} date - Date in YYYY-MM-DD format.
 * @property {number} count - Number of completions for the date.
 */

/**
 * Updates the completed days for a user based on the current date.
 * @param {import('@/contexts/UserContext').Streak} streak - The user's streak object.
 * @param {number} countChange - 1 or -1 to increment or decrement the count for the current date.
 * @returns {import('@/contexts/UserContext').Streak} The updated streak object.
 */
export const updateStreakDays = (streak, countChange) => {
  const currentDate = getChicagoDate()
  const completedDays = streak.completedDays || {}

  // Get the current count for the current date or initialize it to 0
  const currentCount = completedDays[currentDate] || 0

  // Update the count for the current date
  streak.completedDays = {
    ...completedDays,
    [currentDate]: Math.max(0, currentCount + countChange),
  }

  return streak
}

/**
 * Calculates the current streak count based on completedDays.
 * @param {completedDays} completedDays - The map of date strings to completion counts.
 * @returns {{ today: string, streakCount: number }} - The current date and streak count.
 */
export const calculateStreakCount = (completedDays) => {
  const today = getChicagoDate()
  const yesterday = dayjs(today).subtract(1, 'day').format('YYYY-MM-DD')

  // Sort dates in descending order, so we can check from yesterday backward
  const dates = Object.keys(completedDays).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  let streakCount = 0

  for (const date of dates) {
    if (date === today) continue // Skip today, only count until yesterday

    if (completedDays[date] > 0 && date <= yesterday) {
      streakCount++
    } else {
      break // Stop counting if a non-completed day is found
    }
  }

  return { today, streakCount }
}
