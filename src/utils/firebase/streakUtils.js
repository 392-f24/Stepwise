import { db } from '@utils/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

/**
 * Fetch streak data from Firestore by user ID.
 * @param {string} uid - The user's unique identifier.
 * @returns {object} - Streak data with `completedDays` and `streakCount`.
 */
export const getStreakData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      return data.streakData || { completedDays: [], streakCount: 0 };
    } else {
      console.error(`No streak data found for user ${uid}`);
      return { completedDays: [], streakCount: 0 };
    }
  } catch (error) {
    console.error('Error fetching streak data:', error);
    return { completedDays: [], streakCount: 0 };
  }
};

/**
 * Update streak data in Firestore for the specified user.
 * @param {string} uid - The user's unique identifier.
 * @param {Array} completedDays - Array of dates when goals were completed.
 * @param {number} streakCount - Current streak count.
 * @returns {boolean} - Success status of the update.
 */
export const updateStreakData = async (uid, completedDays, streakCount) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      'streakData.completedDays': completedDays,
      'streakData.streakCount': streakCount,
    });
    console.info('Streak data updated successfully.');
    return true;
  } catch (error) {
    console.error('Error updating streak data:', error);
    return false;
  }
};
