export const calculateProgress = (items) => {
  // Calculate the progress of the goal tracker
  const completed = items.reduce(
    (acc, item) => acc + item.tasks.filter((t) => t.completed).length,
    0,
  );
  const total = items.reduce((acc, item) => acc + item.tasks.length, 0);
  return total > 0 ? (completed / total) * 100 : 0;
};
