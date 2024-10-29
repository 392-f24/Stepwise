import { useUser } from '@contexts/UserContext';

/**
 * Custom hook to manage user goals, microgoals, and tasks.
 */
const useGoalsUpdater = () => {
  const { user, updateProfile } = useUser();

  // Add a new goal
  const addGoal = async (goalName) => {
    try {
      const newGoal = {
        name: goalName,
        expanded: false,
        microgoals: [],
      };

      // Add the new goal to the goals array
      const updatedGoals = [...user.goals, newGoal];

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Goal added successfully.');
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  // Add a new microgoal to a specific goal
  const addMicrogoal = async (goalIndex, microgoalName) => {
    try {
      const updatedGoals = [...user.goals];
      if (!updatedGoals[goalIndex]) {
        console.error('Specified goal does not exist');
        return;
      }

      // Define the new microgoal structure
      const newMicrogoal = {
        name: microgoalName,
        expanded: false,
        tasks: [],
      };

      // Add the new microgoal to the specified goal's microgoals array
      const targetGoal = { ...updatedGoals[goalIndex] };
      targetGoal.microgoals = [...(targetGoal.microgoals || []), newMicrogoal];
      updatedGoals[goalIndex] = targetGoal;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Microgoal added successfully.');
    } catch (err) {
      console.error('Error adding microgoal:', err);
    }
  };

  // Add a new task to a specific microgoal
  const addTask = async (goalIndex, microgoalIndex, taskName) => {
    try {
      const updatedGoals = [...user.goals];
      if (!updatedGoals[goalIndex] || !updatedGoals[goalIndex].microgoals[microgoalIndex]) {
        console.error('Specified goal or microgoal does not exist');
        return;
      }

      const newTask = {
        name: taskName,
        completed: false,
      };

      // Add the new task to the specified microgoal's tasks array
      const targetMicrogoal = { ...updatedGoals[goalIndex].microgoals[microgoalIndex] };
      targetMicrogoal.tasks = [...(targetMicrogoal.tasks || []), newTask];
      updatedGoals[goalIndex].microgoals[microgoalIndex] = targetMicrogoal;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Task added successfully.');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Update the completion status of a specific task
  const updateTaskStatus = async (goalIndex, microgoalIndex, taskIndex, completed) => {
    try {
      const updatedGoals = [...user.goals];
      if (
        !updatedGoals[goalIndex] ||
        !updatedGoals[goalIndex].microgoals[microgoalIndex] ||
        !updatedGoals[goalIndex].microgoals[microgoalIndex].tasks[taskIndex]
      ) {
        console.error('Specified goal, microgoal, or task does not exist');
        return;
      }

      // Update the task's completed status
      updatedGoals[goalIndex].microgoals[microgoalIndex].tasks[taskIndex].completed = completed;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Task status updated successfully.');
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return {
    addGoal,
    addMicrogoal,
    addTask,
    updateTaskStatus,
  };
};

export default useGoalsUpdater;
