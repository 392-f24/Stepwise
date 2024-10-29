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

  // Toggle the completion status of a task
  const toggleTaskCompletion = async (goalIndex, microgoalIndex, taskIndex) => {
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

      // Toggle the task's completion status
      updatedGoals[goalIndex].microgoals[microgoalIndex].tasks[taskIndex].completed =
        !updatedGoals[goalIndex].microgoals[microgoalIndex].tasks[taskIndex].completed;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Task completion status toggled successfully.');
    } catch (err) {
      console.error('Error toggling task completion:', err);
    }
  };

  // Check if a goal is expanded and toggle its expansion state
  const toggleGoalExpansion = async (goalIndex) => {
    try {
      const updatedGoals = [...user.goals];
      if (!updatedGoals[goalIndex]) {
        console.error('Specified goal does not exist');
        return;
      }

      // Toggle the goal's expanded state
      updatedGoals[goalIndex].expanded = !updatedGoals[goalIndex].expanded;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Goal expansion toggled successfully.');
    } catch (err) {
      console.error('Error toggling goal expansion:', err);
    }
  };

  // Toggle the expanded state of a specific microgoal
  const toggleMicroGoalExpansion = async (goalIndex, microgoalIndex) => {
    try {
      const updatedGoals = [...user.goals];
      if (!updatedGoals[goalIndex] || !updatedGoals[goalIndex].microgoals[microgoalIndex]) {
        console.error('Specified goal or microgoal does not exist');
        return;
      }

      // Toggle the expanded state of the microgoal
      updatedGoals[goalIndex].microgoals[microgoalIndex].expanded =
        !updatedGoals[goalIndex].microgoals[microgoalIndex].expanded;

      // Update the user profile in Firestore
      await updateProfile({ goals: updatedGoals });
      console.log('Microgoal expansion toggled successfully.');
    } catch (err) {
      console.error('Error toggling microgoal expansion:', err);
    }
  };

  return {
    addGoal,
    addMicrogoal,
    addTask,
    toggleTaskCompletion,
    toggleGoalExpansion,
    toggleMicroGoalExpansion,
  };
};

export default useGoalsUpdater;
