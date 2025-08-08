import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { handleFirestoreError } from '@/lib/utils/error-handler'

export const useAuth = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      return true
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const createUser = async ({
    email,
    password,
  }: {
    name: string
    email: string
    cpf: string
    password: string
  }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)

      if (result.user) throw new Error('Error')

      return result.user
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const passwordRecover = async (email: string): Promise<void> => {
    try {
      const result = await sendPasswordResetEmail(auth, email)
      console.log(result)
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const resetPassword = async ({
    newPassword,
    oobCode,
  }: {
    oobCode: string
    newPassword: string
  }) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)

      return 'Senha alterada com sucesso'
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const validateToken = async (oobCode: string) => {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode)
      return email
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const getResetCodeFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null

    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('oobCode')
  }

  return {
    login,
    logout,
    validateToken,
    resetPassword,
    passwordRecover,
    createUser,
    getResetCodeFromUrl,
  }
}
