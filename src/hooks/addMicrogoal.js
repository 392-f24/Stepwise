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
// Input uid of current user, goalIndex, and microgoal name
const addMicrogoal = async (uid, goalIndex, microgoalName) => {
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

export default addMicrogoal;
