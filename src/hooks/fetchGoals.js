import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

export async function fetchUserGoals(userId) {
  const db = getFirestore();
  const goalsRef = collection(db, 'users');
  const q = query(goalsRef, where('uid', '==', userId));

  const querySnapshot = await getDocs(q);

  // Extract and return only the goals field from the user's document
  const userDoc = querySnapshot.docs[0];
  if (userDoc && userDoc.exists()) {
    const userData = userDoc.data();
    return userData.goals || []; // Return goals field or an empty array if undefined
  }

  return []; // Return an empty array if no user document is found
}
