import { firebaseApp, funcionariosRef, storage } from '@/Firebase/firebase';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
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
	fotoPerfil?: File;
	nascimento: string;
	cargo: string;
	dataAdmissao: string;
	setor: string;
	salario: number;
};

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

export async function postFuncionario(
	funcionario: FuncionarioType,
	fotoPerfil: File
): Promise<string | undefined> {
	try {
		const docRef = await addDoc(funcionariosRef, funcionario);
		const funcionarioId = docRef.id;

		await postImagem(fotoPerfil, funcionarioId);

		console.log('Usuário cadastrado com sucesso');

		return funcionarioId;
	} catch (error) {
		console.log('Erro ao cadastrar funcionário', error);
		return undefined;
	}
}

const postImagem = async (imagem: File, id: string | undefined) => {
	try {
		const storageRef = ref(storage, `imagensPerfil/${id}`);

		await uploadBytes(storageRef, imagem);

		console.log('Imagem de perfil postada com sucesso');
	} catch (error) {
		console.log('Erro ao postar imagem de perfil', error);
	}
};
