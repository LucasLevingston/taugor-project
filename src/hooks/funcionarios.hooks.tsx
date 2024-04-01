import { tabelaFuncionarioRef, storage } from '@/Firebase/firebase';
import {
	addDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

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
	ativo: boolean;
	historico: {
		ocorrido: string;
		data: string;
	}[];
};

export function getFuncionarios(): FuncionarioType[] {
	const [funcionarios, setFuncionarios] = useState<FuncionarioType[]>([]);

	useEffect(() => {
		const fetchFuncionarios = async () => {
			const data = await getDocs(tabelaFuncionarioRef);
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
export function getFuncionariosAtivos(): FuncionarioType[] {
	const [funcionariosAtivos, setFuncionariosAtivos] = useState<
		FuncionarioType[]
	>([]);

	useEffect(() => {
		const fetchFuncionariosAtivos = async () => {
			const q = query(tabelaFuncionarioRef, where('ativo', '==', true));
			const querySnapshot = await getDocs(q);
			const funcionariosData: FuncionarioType[] = [];
			querySnapshot.forEach((doc) => {
				const funcionarioData = {
					...doc.data(),
					id: doc.id,
				} as FuncionarioType;
				funcionariosData.push(funcionarioData);
			});
			setFuncionariosAtivos(funcionariosData);
		};
		fetchFuncionariosAtivos();
	}, []);

	return funcionariosAtivos;
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
				const data = await getDocs(tabelaFuncionarioRef);
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
		const docRef = await addDoc(tabelaFuncionarioRef, funcionario);
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

export async function desativarFuncionario(id?: string) {
	try {
		const funcionarioRef = doc(tabelaFuncionarioRef, id);
		const funcionarioDoc = await getDoc(funcionarioRef);
		const funcionarioData = funcionarioDoc.data();

		if (funcionarioData) {
			const novoHistorico = [
				...(funcionarioData.historico || []),
				{ ocorrido: 'Funcionário desativado', data: new Date().toISOString() },
			];

			await setDoc(
				funcionarioRef,
				{
					...funcionarioData,
					ativo: false,
					historico: novoHistorico,
				},
				{ merge: true }
			);

			return true;
		}
	} catch (error) {
		console.error('Erro ao desativar funcionário:', error);
		return false;
	}
}
interface NovoDado {
	[key: string]: any;
}
export async function alterarDadoFuncionario(
	id: string,
	campo: string,
	novoValor: string
) {
	try {
		const funcionarioRef = doc(tabelaFuncionarioRef, id);
		const novoDado: NovoDado = {};
		if (campo === 'endereco') {
			novoDado[campo] = [novoValor];
		} else {
			novoDado[campo] = novoValor;
		}
		await updateDoc(funcionarioRef, novoDado);
		await adicionarNoHistorico(id, campo, novoValor);
		console.log('Dado do funcionário alterado com sucesso.');
		return true;
	} catch (error) {
		console.error('Erro ao alterar dado do funcionário:', error);
		return false;
	}
}

export async function adicionarNoHistorico(
	id: string,
	campo: string,
	novoValor: string
) {
	console.log(id, campo, novoValor);
	try {
		const funcionarioRef = doc(tabelaFuncionarioRef, id);
		const funcionarioDoc = await getDoc(funcionarioRef);
		const funcionarioData = funcionarioDoc.data();

		const mensagem = `O campo ${campo} foi alterado para '${novoValor}'`;
		if (funcionarioData) {
			const novoHistorico = [
				...(funcionarioData.historico || []),
				{ ocorrido: mensagem, data: new Date().toISOString() },
			];

			await setDoc(
				funcionarioRef,
				{
					...funcionarioData,
					historico: novoHistorico,
				},
				{ merge: true }
			);

			console.log('Entrada adicionada ao histórico com sucesso.');
			return true;
		}
	} catch (error) {
		console.error('Erro ao adicionar entrada ao histórico:', error);
		return false;
	}
}
