import { firebaseApp } from '@/Firebase/firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const db = getFirestore(firebaseApp);
const tabelaFuncionario = collection(db, 'funcionario');

export type FuncionarioType = {
	id?: string;
	nome: string;
	sexo: string;
	email: string;
	endereco: string[];
	telefone: string;
	fotoPerfil: string;
	nascimento: string;
	cargo: string;
	dataAdmissao: string;
	setor: string;
	salario: number;
};
const win: Window = window;

export function getFuncionarios(): FuncionarioType[] {
	const [funcionarios, setFuncionarios] = useState<FuncionarioType[]>([]);

	useEffect(() => {
		const fetchFuncionarios = async () => {
			const data = await getDocs(tabelaFuncionario);
			const funcionarioData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as FuncionarioType[];
			setFuncionarios(funcionarioData);
		};

		fetchFuncionarios();
	}, []);

	return funcionarios;
}

export function getFuncionarioPeloId(
	id: string | undefined
): FuncionarioType | null {
	const [funcionario, setFuncionario] = useState<FuncionarioType | null>(null);

	useEffect(() => {
		if (!id) {
			console.log('Usuário não encontrado');
			return;
		}

		const fetchFuncionario = async () => {
			try {
				const data = await getDocs(tabelaFuncionario);
				const funcionarioData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as FuncionarioType[];

				const funcionarioEncontrado = funcionarioData.find((f) => f.id === id);
				if (funcionarioEncontrado) {
					setFuncionario(funcionarioEncontrado);
				} else {
					console.log('Funcionário não encontrado');
				}
			} catch (error) {
				console.error('Erro ao buscar funcionário:', error);
			}
		};

		fetchFuncionario();
	}, [id]);

	return funcionario;
}
