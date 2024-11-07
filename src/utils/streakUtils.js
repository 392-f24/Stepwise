// @ts-check

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
 * Streak data type for a user.
 * @typedef {Object} Streak
 * @property {Object.<string, number>} completedDays - Map of date strings to their completion counts.
 * @property {number} count - Current streak count.
 */

/**
 * User data type.
 * @typedef {Object} User
 * @property {Streak} streak - User's streak data.
 */

/**
 * Updates the streak count and completed days for a user.
 * @param {User} user - The user object containing streak information.
 * @param {number} countChange - The change to apply to the completion count for the current date.
 * @returns {{completedDays: Object.<string, number>, count: number}} - Updated completedDays as a map of date-count pairs and the new streak count.
 */
export const updateStreakDays = (user, countChange) => {
  const currentDate = getChicagoDate()

  // { completedDays: { '2024-11-01': 1, '2024-11-02': 0 }, count: 1 }
  const completedDays = user.streak?.completedDays || {}
  const count = user.streak?.count || 0

  // Get the current count for the current date or initialize it to 0
  const currentCount = completedDays[currentDate] || 0

  // Update the count for the current date
  completedDays[currentDate] = Math.max(0, currentCount + countChange)

  // Adjust the streak count based on changes to the current day's count
  let newCount = count
  if (currentCount === 0 && countChange > 0) {
    // Increment streak if new positive count for the day
    newCount++
  } else if (currentCount > 0 && completedDays[currentDate] === 0) {
    // Decrement streak if current day count goes to 0
    newCount = Math.max(0, newCount - 1)
  }

  return {
    completedDays,
    count: newCount,
  }
}
