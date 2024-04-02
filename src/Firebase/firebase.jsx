import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import React from 'react';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import dotenv from 'dotenv';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const storage = getStorage();

export const tabelaFuncionarioRef = collection(db, 'funcionarios');
export const fotosRef = ref(storage, 'fotosPerfil');

export const auth = getAuth(firebaseApp);
setPersistence(auth, browserSessionPersistence)
	.then(() => {})
	.catch((error) => {
		console.error(
			'Erro ao habilitar persistência de autenticação:',
			error.message
		);
	});

export const isUsuarioAutenticado = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((usuario) => {
			if (usuario) {
				resolve(usuario);
			} else {
				reject(new Error('Usuário não autenticado.'));
			}
			unsubscribe();
		});
	});
};
