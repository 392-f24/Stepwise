/**
 * Get unique dates on which tasks have been completed
 * @param {Array} goals - List of goal objects, each containing microgoals and tasks
 * @returns {Array} - Unique dates when tasks were marked as completed
 */
export const getCompletedDates = (goals) => {
  const completedDates = new Set();

  // Check if goals is an array and iterate only if it exists
  if (Array.isArray(goals)) {
    goals.forEach((goal) => {
      // Ensure microgoals is defined and an array
      if (Array.isArray(goal.microgoals)) {
        goal.microgoals.forEach((microGoal) => {
          // Ensure tasks is defined and an array
          if (Array.isArray(microGoal.tasks)) {
            microGoal.tasks.forEach((task) => {
              // Check for both task completion and valid completion date
              if (task.completed && task.completionDate) {
                completedDates.add(task.completionDate);
              }
            });
          }
        });
      }
    });
  }

  return Array.from(completedDates);
};
