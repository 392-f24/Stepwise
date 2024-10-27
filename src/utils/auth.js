import { createFirstUserProfile, fetchUserProfile } from '@utils/firebase/createUserProfile';
import { auth } from '@utils/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();

// Google Sign-In function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    return null;
  }
};

// Handle Sign-In
// Returns true if the user already exists in the database, false if a new profile was created
export const handleSignIn = async () => {
  const user = await signInWithGoogle();

  if (user) {
    // Try to fetch the existing user profile
    const { profile } = await fetchUserProfile(user.uid);

    // If no profile found, create one with default data
    if (!profile) {
      await createFirstUserProfile(user);
      return false; // New user profile created
    }
    return true; // User profile already exists
  }
  return false; // Sign-in failed or cancelled
};

// Handle Sign-Out
// Redirects to homepage after sign-out
export const handleSignOut = async (navigate) => {
  try {
    await signOut(auth);
    console.log('Sign out successful');
    navigate('/');
  } catch (error) {
    console.error('Error during sign-out:', error);
  }
};
