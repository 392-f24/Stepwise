import { useUser } from '@contexts/UserContext';

const useGoalsUpdater = () => {
  const { user, updateProfile } = useUser();

  // Update the goals in the user profile
  const updateGoals = async (updatedGoals, message) => {
    try {
      await updateProfile({ goals: updatedGoals });
      console.log(message);
    } catch (error) {
      console.error(`Error updating goals: ${message}`, error);
    }
  };

  // Add a new goal, microgoal, or task
  const addItem = async (goalIndex, microGoalIndex, newItem, itemType) => {
    const updatedGoals = [...user.goals];
    let target = updatedGoals[goalIndex];
    if (microGoalIndex !== undefined) {
      target = target?.microgoals[microGoalIndex];
    }

    if (!target && itemType !== 'goal') {
      console.error(`${itemType} does not exist`);
      return;
    }

    if (itemType === 'task') {
      target.tasks.push(newItem);
    } else if (itemType === 'microgoal') {
      target.microgoals.push(newItem);
    } else if (itemType === 'goal') {
      updatedGoals.push(newItem);
    }

    await updateGoals(
      updatedGoals,
      `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added successfully.`,
    );
  };

  // Toggle the expansion status of a goal or microgoal
  const toggleExpansion = async (goalIndex, microGoalIndex) => {
    const updatedGoals = [...user.goals];
    const target =
      microGoalIndex !== undefined
        ? updatedGoals[goalIndex].microgoals[microGoalIndex]
        : updatedGoals[goalIndex];
    target.expanded = !target.expanded;
    await updateGoals(updatedGoals, 'Expansion toggled successfully.');
  };

  // Toggle the completion status of a task
  const toggleTaskCompletion = async (goalIndex, microgoalIndex, taskIndex) => {
    const updatedGoals = [...user.goals];
    const task = updatedGoals[goalIndex]?.microgoals[microgoalIndex]?.tasks[taskIndex];
    if (!task) {
      console.error('Specified goal, microgoal, or task does not exist');
      return;
    }
    // Toggle the task completion status
    task.completed = !task.completed;

    // Set the completion date when the task is completed, clear if uncompleted
    task.completionDate = task.completed ? new Date().toISOString().split('T')[0] : null;
    // Update the user profile with updated goals
    await updateGoals(updatedGoals, 'Task completion status toggled successfully.');
  };

  // Delete a goal, microgoal, or task
  const deleteItem = async ({ goalIndex, microGoalIndex = undefined, taskIndex = undefined }) => {
    const updatedGoals = [...user.goals];

    if (taskIndex !== undefined) {
      updatedGoals[goalIndex]?.microgoals[microGoalIndex]?.tasks.splice(taskIndex, 1);
    } else if (microGoalIndex !== undefined) {
      updatedGoals[goalIndex]?.microgoals.splice(microGoalIndex, 1);
    } else if (goalIndex !== undefined) {
      updatedGoals.splice(goalIndex, 1);
    }

    await updateGoals(updatedGoals, 'Item deleted successfully.');
  };

  return {
    // Add a new goal, microgoal, or task
    addGoal: (goalName) =>
      addItem(undefined, undefined, { name: goalName, expanded: false, microgoals: [] }, 'goal'),
    addMicrogoal: (goalIndex, microGoalName) =>
      addItem(
        goalIndex,
        undefined,
        { name: microGoalName, expanded: false, tasks: [] },
        'microgoal',
      ),
    addTask: (goalIndex, microGoalIndex, taskName) =>
      addItem(goalIndex, microGoalIndex, { name: taskName, completed: false }, 'task'),

    // Delete
    deleteItem,
    toggleTaskCompletion,

    toggleGoalExpansion: (goalIndex) => toggleExpansion(goalIndex),
    toggleMicroGoalExpansion: (goalIndex, microGoalIndex) =>
      toggleExpansion(goalIndex, microGoalIndex),
  };
};

export default useGoalsUpdater;
