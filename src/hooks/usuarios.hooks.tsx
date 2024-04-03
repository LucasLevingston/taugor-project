import { useEffect, useState } from 'react';
import { isUsuarioAutenticado } from '../Firebase/firebase';
import firebase from 'firebase/compat/app';

export interface estadoAutenticacao {
	carregando: boolean;
	usuario: firebase.User | null;
	error: Error | null;
}

export const useAuntenticacao = (): estadoAutenticacao => {
	const [authState, setAuthState] = useState<estadoAutenticacao>({
		carregando: true,
		usuario: null,
		error: null,
	});

	useEffect(() => {
		const fetchAuthState = async () => {
			try {
				const usuario = await isUsuarioAutenticado();
				setAuthState({ carregando: false, usuario, error: null });
			} catch (error: any) {
				setAuthState({ carregando: false, usuario: null, error });
				console.error('Erro ao verificar autenticação:', error.message);
			}
		};

		fetchAuthState();
	}, []);

	return authState;
};
