import { db } from '@utils/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Unified function to fetch and listen to user profile changes by UID
// (supports both regular and transaction-based fetches)
export const fetchUserProfile = async (uid, transaction = null) => {
  try {
    const userRef = doc(db, 'users', uid);

    // If transaction is provided, use it to fetch the document
    const userSnapshot = transaction ? await transaction.get(userRef) : await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error(`User profile for ${uid} does not exist`);
      return { ref: userRef, profile: null }; // Return consistent format with null profile
    }

    const profile = userSnapshot.data();
    return { ref: userRef, profile };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { ref: null, profile: null };
  }
};

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

// Check or create user profile in Firestore (uses fetchUserProfile to streamline code)
export const createFirstUserProfile = async (user) => {
  try {
    const { uid, photoURL, displayName } = user;
    const defaultProfile = {
      uid,
      profilePic: photoURL || '',
      name: displayName || '',
      goals: [],
      streak: [],
    };

    // If the profile does not exist, create it with the default data
    await setDoc(doc(db, 'users', uid), defaultProfile);
    console.warn('New user profile created with default data.');

    return true;
  } catch (error) {
    console.error('Error checking or creating user profile:', error);
    return false; // Return false if an error occurs
  }
};

// Get user profile by UID
// (simple wrapper around fetchUserProfile for non-transaction use)
export const getUserProfile = async (uid) => {
  const fetchedUser = await fetchUserProfile(uid);
  return fetchedUser ? fetchedUser.profile : null; // Return only the profile data
};

// Update user profile by UID
export const updateUserProfile = async (uid, updates) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, updates);
    console.warn('User profile updated');
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
