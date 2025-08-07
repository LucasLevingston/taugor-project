import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { env } from '@/env'

export const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
})

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()

export const employeeTableRef = collection(db, 'employees')
export const profilePicturesTableRef = ref(storage, 'profilePictures')

setPersistence(auth, browserLocalPersistence).catch(error => {
  console.error(
    'Erro ao habilitar persistência de autenticação:',
    error.message
  )
})
