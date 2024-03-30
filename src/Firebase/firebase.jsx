import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import React from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

// import dotenv from 'dotenv';
// dotenv.config();

// const firebaseConfig = {
// 	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// 	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// 	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// 	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: import.meta.env.VITE_FIREBASE_APP_ID,
// 	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
	apiKey: 'AIzaSyCeM3S44Mbrdyi1_LjMuCPC4VQSHhzaspE',
	authDomain: 'taugor-project-11e64.firebaseapp.com',
	projectId: 'taugor-project-11e64',
	storageBucket: 'taugor-project-11e64.appspot.com',
	messagingSenderId: '553442758015',
	appId: '1:553442758015:web:6ed176031587f051d35e4a',
	measurementId: 'G-84JGCSF05Y',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const funcionariosRef = collection(db, 'funcionario');
export const fotosRef = ref(storage, 'fotosPerfil');

// const analytics = getAnalytics(app);
