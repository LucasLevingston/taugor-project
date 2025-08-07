import { User as FirebaseUser, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const useUser = () => {
  const getUser = () => {
    return auth.currentUser
  }

  const updateUser = async (data: Partial<FirebaseUser>): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error('No user logged in')
    }
    try {
      await updateProfile(auth.currentUser, {
        displayName:
          data.displayName === undefined
            ? auth.currentUser.displayName
            : data.displayName,
        photoURL:
          data.photoURL === undefined
            ? auth.currentUser.photoURL
            : data.photoURL,
      })
    } catch (err) {
      console.error('Error updating user:', err)
      throw err
    }
  }

  const logOut = async (): Promise<void> => {
    try {
      await auth.signOut()
    } catch (err) {
      console.error('Error logging out:', err)
      throw err
    }
  }

  return {
    logOut,
    getUser,
    updateUser,
  }
}
