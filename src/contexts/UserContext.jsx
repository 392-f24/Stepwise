// @ts-check

import LoadingCircle from '@/components/common/LoadingCircle'
import { signInWithGoogle } from '@/utils/firebase/authUtils'
import {
  fetchUserProfile,
  updateUserProfile,
} from '@/utils/firebase/createUserProfile'
import { auth } from '@/utils/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

/**
 * @typedef {Object} Task
 * @property {string} name - Name of the task.
 * @property {boolean} completed - Whether the task is completed.
 */

/**
 * @typedef {Object<string, Task>} TaskMap - A map of task IDs to Task objects.
 */

/**
 * @typedef {Object} MicroGoal
 * @property {string} name - Name of the microgoal.
 * @property {boolean} expanded - Whether the microgoal is expanded.
 * @property {TaskMap} tasks - Map of task IDs to tasks within the microgoal.
 */

/**
 * @typedef {Object<string, MicroGoal>} MicroGoalMap - A map of microgoal IDs to MicroGoal objects.
 */

/**
 * @typedef {Object} Goal
 * @property {string} name - Name of the goal.
 * @property {boolean} expanded - Whether the goal is expanded.
 * @property {string} category - HEX color code for the goal category.
 * @property {MicroGoalMap} microgoals - Map of microgoal IDs to microgoals within the goal.
 */

/**
 * @typedef {Object<string, Goal>} GoalMap - A map of goal IDs to Goal objects.
 */

/**
 * @typedef {Object} CompletedDays
 * @property {string} date - Date in YYYY-MM-DD format.
 * @property {number} count - Number of completions for the date.
 */

/**
 * @typedef {Object} Streak
 * @property {CompletedDays} completedDays - Map of dates (as strings) to their completion counts.
 * @property {number} count - Current streak count.
 * @property {number} todayCount - Today's completion count.
 */

/**
 * @typedef {Object} User
 * @property {string} uid - User's UID.
 * @property {string} profilePic - URL of the user's profile picture.
 * @property {string} name - User's display name.
 * @property {GoalMap} goals - Map of goal IDs to user's goals.
 * @property {Streak} streak - User's streak data.
 */

/**
 * @typedef {Object} UserContextType
 * @property {User | null} user - Current user profile or null if not logged in.
 * @property {boolean} loading - Whether the user data is still loading.
 * @property {() => Promise<boolean>} handleSignIn - Function to handle user sign-in.
 * @property {() => Promise<void>} handleSignOut - Function to handle user sign-out.
 * @property {(updates: Partial<User>) => Promise<void>} updateProfile - Function to update user profile.
 */

// Create UserContext
/** @type {import('react').Context<UserContextType>} */
const UserContext = createContext({
  user: null,
  loading: false,
  handleSignIn: async () => false,
  handleSignOut: async () => {},
  updateProfile: async (updates) => {},
})

// Custom hook to use UserContext
/** @returns {UserContextType} */
export const useUser = () => useContext(UserContext)

/**
 * @param {{ children: React.ReactNode }} props - The component's props.
 * @returns {JSX.Element} - The UserProvider component.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(/** @type {User | null} */ (null))
  const [loading, setLoading] = useState(true)

  // handle Sign-In
  /** @returns {Promise<boolean>} */
  const handleSignIn = async () => {
    const userData = await signInWithGoogle()
    if (userData) {
      setUser(userData)
      return true
    }
    return false
  }

  // Handle Sign-Out
  /** @returns {Promise<void>} */
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
      console.log('Sign out successful')
    } catch (error) {
      console.error('Error during sign-out:', error)
    }
  }

  // Listen for auth state changes, and fetch user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid)
        if (profile) {
          setUser({ ...firebaseUser, ...profile })
        } else {
          console.error('Failed to fetch user profile, logging out the user.')
          await handleSignOut()
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Function to update user profile
  /**
   * @param {Partial<User>} updates - The updates to apply to the user profile.
   * @returns {Promise<void>}
   */
  const updateProfile = async (updates) => {
    if (user) {
      await updateUserProfile(user.uid, updates)
      setUser((prevUser) => ({ ...prevUser, ...updates }))
    }
  }

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
      {!loading ? children : <LoadingCircle />}
    </UserContext.Provider>
  )
}
