import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyPasswordResetCode,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { handleFirestoreError } from '@/lib/utils/error-handler'
import { useUserStore } from '@/stores/user-store'
import { UserType } from '@/types/user-type'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { setUser, setError, clearUser } = useUserStore()

  const createUserDocument = async (
    firebaseUser: FirebaseUser
  ): Promise<UserType> => {
    const userData: UserType = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await setDoc(doc(db, 'users', firebaseUser.uid), userData)
    return userData
  }

  const loginWithGoogle = async (): Promise<UserType> => {
    try {
      setLoading(true)
      setError(null)

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const userData = await createUserDocument(result.user)
      setUser(userData)

      return userData
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserType> => {
    try {
      setLoading(true)
      setError(null)

      const result = await signInWithEmailAndPassword(auth, email, password)
      const userData = await createUserDocument(result.user)
      setUser(userData)
      console.log(result)
      return userData
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async ({
    email,
    password,
    name: displayName,
  }: {
    name: string
    email: string
    cpf: string
    password: string
  }): Promise<UserType> => {
    try {
      setLoading(true)
      setError(null)

      const result = await createUserWithEmailAndPassword(auth, email, password)

      // if (displayName) {
      //   await result.user.updateProfile({ displayName })
      // }

      const userData = await createUserDocument(result.user)
      setUser(userData)

      return userData
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      await signOut(auth)
      clearUser()
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const passwordRecover = async (email: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (
    oobCode: string,
    newPassword: string
  ): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      await confirmPasswordReset(auth, oobCode, newPassword)
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const validateToken = async (oobCode: string): Promise<string> => {
    try {
      setLoading(true)
      setError(null)
      const email = await verifyPasswordResetCode(auth, oobCode)
      return email
    } catch (error) {
      handleFirestoreError(error)
    } finally {
      setLoading(false)
    }
  }

  const getResetCodeFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null

    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('oobCode')
  }

  return {
    loading,
    loginWithGoogle,
    login,
    logout,
    validateToken,
    resetPassword,
    passwordRecover,
    createUser,
    getResetCodeFromUrl,
  }
}
