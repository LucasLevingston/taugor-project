// usuarios.hooks.tsx
import { useEffect, useState } from 'react';
import { isUserAuthenticated } from '../Firebase/firebase';
import firebase from 'firebase/compat/app';

export interface AuthState {
	loading: boolean;
	user: firebase.User | null;
	error: Error | null;
}

export const useAuthentication = (): AuthState => {
	const [authState, setAuthState] = useState<AuthState>({
		loading: true,
		user: null,
		error: null,
	});

	useEffect(() => {
		const fetchAuthState = async () => {
			try {
				const user = await isUserAuthenticated();
				setAuthState({ loading: false, user, error: null });
			} catch (error: any) {
				setAuthState({ loading: false, user: null, error });
				console.error('Erro ao verificar autenticação:', error.message);
			}
		};

		fetchAuthState();
	}, []);

	return authState;
};
