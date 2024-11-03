import LoadingCircle from '@components/common/LoadingCircle';
import { calculateProgress } from '@utils/calculateProgress';
import { signInWithGoogle } from '@utils/firebase/authUtils';
import { fetchUserProfile, updateUserProfile } from '@utils/firebase/createUserProfile';
import { getStreakData, updateStreakData } from '@utils/firebase/streakUtils';
import { auth } from '@utils/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const UserContext = createContext();

// Hook for accessing UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState([]);
  const [streakCount, setStreakCount] = useState(0);

  const today = new Date().toISOString().split('T')[0];

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
          await fetchStreakData(firebaseUser.uid);
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

  // Fetch streak data
  const fetchStreakData = async (userId) => {
    const { completedDays, streakCount } = await getStreakData(userId);
    setCompletedDays(completedDays || []);
    setStreakCount(streakCount || 0);
  };

  // Calculate streak based on consecutive days
  const calculateStreak = (days) => {
    const sortedDates = days.sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      const dayDiff = (new Date(today) - new Date(sortedDates[i])) / (1000 * 60 * 60 * 24);
      if (dayDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Check for progress on goals and tasks today
  const checkDailyProgress = async (goals) => {
    const { completedDates } = calculateProgress(goals);
    const progressMadeToday = completedDates.includes(today);

    if (progressMadeToday && !completedDays.includes(today)) {
      const updatedDays = [...completedDays, today];
      const newStreakCount = calculateStreak(updatedDays);

      setCompletedDays(updatedDays);
      setStreakCount(newStreakCount);

      if (user) {
        await updateStreakData(user.uid, updatedDays, newStreakCount);
      }
    }
  };

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
        streakCount,
        completedDays,
        checkDailyProgress,
      }}
    >
      {!loading ? children : <LoadingCircle />}
    </UserContext.Provider>
  );
};

export default UserProvider;
