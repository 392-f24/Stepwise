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
// input uid of current user && the name of the goal wannted to be added
const addGoal = async (uid, goalName) => {
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

export default addGoal;
