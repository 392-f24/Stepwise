// utils/firebase/addTask.js
import { getUserProfile, updateUserProfile } from '@utils/firebase/createUserProfile';
/* goals structure
{
  name: '',
  progress: 0,
  microgoals: [
    {
      name: '',
      progress: 0,
      tasks: [{ name: '', completed: false }],
    },
  ],
}, 
*/
// Input uid of current user, goalIndex, microgoalIndex, and task name
const addTask = async (uid, goalIndex, microgoalIndex, taskName) => {
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

export default addTask;
