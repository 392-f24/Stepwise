export const calculateProgress = (items) => {
  // Calculate the progress of the goal tracker
  const completedTasks = items.reduce(
    (acc, item) => acc + item.tasks.filter((t) => t.completed).length,
    0,
  );
  const totalTasks = items.reduce((acc, item) => acc + item.tasks.length, 0);

  // Gather the unique dates of completed tasks
  const completedDates = items.flatMap((item) =>
    item.tasks
      .filter((task) => task.completed && task.completedDate) // Ensure `completedDate` is defined
      .map((task) => task.completedDate),
  );

  // Return progress and the unique dates of completed tasks
  return {
    progress: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    completedDates: [...new Set(completedDates)], // Unique dates only
  };
};
