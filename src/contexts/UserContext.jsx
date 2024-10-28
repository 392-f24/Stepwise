import { Box, CircularProgress } from '@mui/material';
import { signInWithGoogle } from '@utils/firebase/authUtils';
import { fetchUserProfile, updateUserProfile } from '@utils/firebase/createUserProfile';
import { auth } from '@utils/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // handle Sign-In
  const handleSignIn = async () => {
    const userData = await signInWithGoogle();
    if (userData) {
      setUser(userData);
      return true;
    }
    return false;
  };

  // Handle Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  // Listen for auth state changes, and fetch user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile if user is logged in
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUser({ ...firebaseUser, ...profile });
        } else {
          console.error('Failed to fetch user profile, logging out the user.');
          await handleSignOut();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to update user profile
  const updateProfile = async (updates) => {
    if (user) {
      await updateUserProfile(user.uid, updates);
      setUser((prevUser) => ({ ...prevUser, ...updates }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        handleSignIn,
        handleSignOut,
        updateProfile,
      }}
    >
      {!loading ? (
        children
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      )}
    </UserContext.Provider>
  );
};
