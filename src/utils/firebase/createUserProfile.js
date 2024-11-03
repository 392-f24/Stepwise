import { db } from '@utils/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Fetches the user profile data from Firestore by UID.
 * @param {string} uid - User's UID.
 * @returns {object|null} - The user profile data or null if not found.
 */
export const fetchUserProfile = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error(`User profile for ${uid} does not exist`);
      return null;
    }

    return userSnapshot.data();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Creates a user profile in Firestore with default data if it doesn't exist.
 * @param {object} user - The authenticated user object.
 * @returns {boolean} - Returns true if the profile is created or exists, false otherwise.
 */
export const createFirstUserProfile = async (user) => {
  const { uid, photoURL, displayName } = user;
  const defaultProfile = {
    uid,
    profilePic: photoURL || '',
    name: displayName || '',
    goals: [],
    streakData: {
      completedDays: [], // Array to store dates when tasks were completed
      streakCount: 0, // Initial streak count
    },
  };

  try {
    // Use a transaction to ensure atomic check-and-create behavior
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, defaultProfile);
      console.warn('New user profile created with default data.');
    } else {
      console.info('User profile already exists.');
    }

    return true;
  } catch (error) {
    console.error('Error creating or checking user profile:', error);
    return false;
  }
};

/**
 * Retrieves the user profile from Firestore by UID.
 * @param {string} uid - User's UID.
 * @returns {object|null} - The user profile data or null if not found.
 */
export const getUserProfile = async (uid) => {
  return await fetchUserProfile(uid);
};

/**
 * Updates the user profile data in Firestore by UID.
 * @param {string} uid - User's UID.
 * @param {object} updates - The fields to update in the user profile.
 * @returns {boolean} - Returns true if the update is successful, false otherwise.
 */
export const updateUserProfile = async (uid, updates) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, updates);
    console.info('User profile updated successfully.');
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};
