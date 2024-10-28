import { getUserProfile, updateUserProfile } from '@utils/firebase/createUserProfile';

// input uid of current user && the name of the goal wannted to be added
export const addGoal = async (uid, goalName) => {
  if (!uid) {
    console.error('User ID is required to add a goal');
    return;
  }

  try {
    // Fetch the current user profile
    const userProfile = await getUserProfile(uid);

    const newGoal = {
      name: goalName,
      progress: 0,
      microgoals: [],
    };

    // Add the new goal to the goals array
    const updatedGoals = [...(userProfile.goals || []), newGoal];

    // Update the user profile in Firestore
    await updateUserProfile(uid, { goals: updatedGoals });
    console.log('Goal added successfully.');
  } catch (err) {
    console.error('Error adding goal:', err);
  }
};

// Input uid of current user, goalIndex, and microgoal name
export const addMicrogoal = async (uid, goalIndex, microgoalName) => {
  if (!uid) {
    console.error('User ID is required to add a microgoal');
    return;
  }

  try {
    // Fetch the current user profile
    const userProfile = await getUserProfile(uid);

    // Check if the specified goal exists
    const updatedGoals = [...(userProfile.goals || [])];
    if (!updatedGoals[goalIndex]) {
      console.error('Specified goal does not exist');
      return;
    }

    // Define the new microgoal structure
    const newMicrogoal = {
      name: microgoalName,
      progress: 0,
      tasks: [],
    };

    // Add the new microgoal to the specified goal's microgoals array
    const targetGoal = { ...updatedGoals[goalIndex] };
    targetGoal.microgoals = [...(targetGoal.microgoals || []), newMicrogoal];
    updatedGoals[goalIndex] = targetGoal;

    // Update the user profile in Firestore
    await updateUserProfile(uid, { goals: updatedGoals });
    console.log('Microgoal added successfully.');
  } catch (err) {
    console.error('Error adding microgoal:', err);
  }
};

// Input uid of current user, goalIndex, microgoalIndex, and task name
export const addTask = async (uid, goalIndex, microgoalIndex, taskName) => {
  if (!uid) {
    console.error('User ID is required to add a task');
    return;
  }

  try {
    // Fetch the current user profile
    const userProfile = await getUserProfile(uid);

    // Check if the specified goal and microgoal exist
    const updatedGoals = [...(userProfile.goals || [])];
    if (!updatedGoals[goalIndex] || !updatedGoals[goalIndex].microgoals[microgoalIndex]) {
      console.error('Specified goal or microgoal does not exist');
      return;
    }

    // Define the new task structure
    const newTask = {
      name: taskName,
      completed: false,
    };

    // Add the new task to the specified microgoal's tasks array
    const targetMicrogoal = { ...updatedGoals[goalIndex].microgoals[microgoalIndex] };
    targetMicrogoal.tasks = [...(targetMicrogoal.tasks || []), newTask];
    updatedGoals[goalIndex].microgoals[microgoalIndex] = targetMicrogoal;

    // Update the user profile in Firestore
    await updateUserProfile(uid, { goals: updatedGoals });
    console.log('Task added successfully.');
  } catch (err) {
    console.error('Error adding task:', err);
  }
};

// input uid of current user, index for goal, index of microgoal, index of task, and status boolean
export const updateTaskStatus = async (uid, goalIndex, microgoalIndex, taskIndex, completed) => {
  if (!uid) {
    console.error('User ID is required to update task status');
    return;
  }

  try {
    // Fetch the current user profile
    const userProfile = await getUserProfile(uid);

    // Check if the specified goal, microgoal, and task exist
    const updatedGoals = [...(userProfile.goals || [])];
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
    await updateUserProfile(uid, { goals: updatedGoals });
    console.log('Task status updated successfully.');
  } catch (err) {
    console.error('Error updating task status:', err);
  }
};
