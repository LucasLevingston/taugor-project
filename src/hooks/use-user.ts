import { User as FirebaseUser, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthProvider } from '@/providers/auth-context'

export const useUser = () => {
  const { user } = useAuthProvider()

  const updateUser = async (data: Partial<FirebaseUser>): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in')
    }
    try {
      await updateProfile(user, {
        displayName:
          data.displayName === undefined ? user.displayName : data.displayName,
        photoURL: data.photoURL === undefined ? user.photoURL : data.photoURL,
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
    user,
    updateUser,
  }
}
