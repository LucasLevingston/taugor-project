import { onAuthStateChanged, User, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { useUserStore } from '@/stores/user-store'
import type { UserType } from '@/types/user-type'

export const useUser = () => {
  const { user, loading, error, setUser, setLoading, setError, clearUser } =
    useUserStore()

  useEffect(() => {
    setLoading(true)

    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        try {
          const userData = await getUser(firebaseUser.uid)
          setUser(userData)
        } catch (err) {
          console.error('Error fetching user data:', err)
          setError('Failed to fetch user data')
        }
      } else {
        clearUser()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading, setError, clearUser])

  const getUser = async (uid: string): Promise<UserType> => {
    const userDoc = await getDoc(doc(db, 'users', uid))

    if (userDoc.exists()) {
      return userDoc.data() as UserType
    } else {
      // Create user document if it doesn't exist
      const firebaseUser = auth.currentUser
      if (firebaseUser) {
        const newUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        }

        await setDoc(doc(db, 'users', uid), newUser)
        return newUser
      }
      throw new Error('User not found')
    }
  }

  const updateUser = async (data: UserType): Promise<void> => {
    if (!user || !auth.currentUser) {
      throw new Error('No user logged in')
    }

    try {
      setLoading(true)

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      })

      // Update Firestore document
      const updatedData = {
        ...data,
        updatedAt: new Date().toISOString(),
      }

      await updateDoc(doc(db, 'users', user.id), updatedData)

      // Update local state
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
    } catch (err) {
      console.error('Error updating user:', err)
      setError('Failed to update user')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logOut = async (): Promise<void> => {
    try {
      setLoading(true)
      await auth.signOut()
      clearUser()
    } catch (err) {
      console.error('Error logging out:', err)
      setError('Failed to log out')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    logOut,
    setUser,
    getUser,
    updateUser,
  }
}
