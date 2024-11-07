// @ts-check

import {
  createFirstUserProfile,
  fetchUserProfile,
} from '@/utils/firebase/createUserProfile'
import { auth } from '@/utils/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider()

/**
 * Signs in the user using Google OAuth
 * @returns {Promise<object | null>} - The user profile data or null if sign-in fails.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const firebaseUser = result.user

    // Fetch user profile or create a new one for first-time users
    let profile = await fetchUserProfile(firebaseUser.uid)
    if (!profile) {
      await createFirstUserProfile(firebaseUser)
      profile = await fetchUserProfile(firebaseUser.uid)
    }

    return { ...firebaseUser, ...profile }
  } catch (error) {
    console.error('Error during sign-in:', error)
    return null
  }
}
