export const getChicagoDate = () => {
  const chicagoTimeOffset = -6 * 60 // CST is UTC-6
  const chicagoDate = new Date(
    new Date().getTime() + chicagoTimeOffset * 60 * 1000
  )
  return chicagoDate.toISOString().split('T')[0]
}

// Function to update the streak count and completed days for a user
export const updateStreakDays = (user, countChange) => {
  const currentDate = getChicagoDate()

  // {date: count, ...}
  const completedDays = user.streak?.completedDays || {}
  // Initial streak count if not set yet
  const streakCount = user.streak?.count || 0

  // Update the completed days count
  const currentCount = completedDays[currentDate] || 0
  completedDays[currentDate] = Math.max(0, currentCount + countChange)

  // Check if the streak count needs to be updated
  let newStreakCount = streakCount
  if (currentCount === 0 && countChange > 0) {
    // 0 -> positive, streak count increases
    newStreakCount++
  } else if (currentCount > 0 && completedDays[currentDate] === 0) {
    // positive -> 0, streak count decreases
    newStreakCount = Math.max(0, newStreakCount - 1)
  }

  return {
    completedDays,
    count: newStreakCount,
  }
}
