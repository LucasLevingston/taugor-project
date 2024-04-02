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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

export type FuncionarioType = {
	id?: string;
	nome: string;
	sexo: string;
	email: string;
	rua: string;
	numero: string;
	cep: string;
	cidade: string;
	estado: string;
	telefone: string;
	fotoPerfil?: File;
	fotoPerfilUrl?: string;
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

			const promises: Promise<FuncionarioType | null>[] =
				querySnapshot.docs.map(async (doc) => {
					const funcionarioData = {
						...doc.data(),
						id: doc.id,
					} as FuncionarioType;
					if (funcionarioData.id) {
						funcionarioData.fotoPerfilUrl = await getFotoPerfil(
							funcionarioData.id
						);
						return funcionarioData;
					}
					return null;
				});

			const funcionariosData = await Promise.all(promises);
			const funcionariosDataFiltered = funcionariosData.filter(
				(funcionario) => funcionario !== null
			) as FuncionarioType[];
			setFuncionariosAtivos(funcionariosDataFiltered);
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
			console.log('ID do usuário não fornecido');
			return;
		}

		const fetchFuncionario = async () => {
			try {
				const data = await getDocs(tabelaFuncionarioRef);

				const funcionarioData = data.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as FuncionarioType[];

				const funcionarioEncontrado = funcionarioData.find((f) => f.id === id);
				if (funcionarioEncontrado) {
					funcionarioEncontrado.fotoPerfilUrl = await getFotoPerfil(id);
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

export async function getFotoPerfil(id: string): Promise<string> {
	try {
		const fotoPerfilRef = ref(storage, `imagensPerfil/${id}`);
		const url = await getDownloadURL(fotoPerfilRef);

		return url;
	} catch (error) {
		console.error('Erro ao obter foto de perfil:', error);
		return '';
	}
}
export async function postFuncionario(
	funcionario: FuncionarioType,
	fotoPerfil: File
): Promise<string | undefined> {
	try {
		const docRef = await addDoc(tabelaFuncionarioRef, funcionario);
		const funcionarioId = docRef.id;

		await postFotoPerfil(fotoPerfil, funcionarioId);

		return funcionarioId;
	} catch (error) {
		console.log('Erro ao cadastrar funcionário', error);
		return undefined;
	}
}

const postFotoPerfil = async (imagem: File, id: string | undefined) => {
	try {
		const storageRef = ref(storage, `imagensPerfil/${id}`);
		const metadata = {
			contentType: 'image/jpg',
		};
		await uploadBytes(storageRef, imagem, metadata);
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
	novoValor: string | File | number
) {
	try {
		const funcionarioRef = doc(tabelaFuncionarioRef, id);
		const novoDado: NovoDado = {};

		if (campo === 'fotoPerfil' && novoValor instanceof File) {
			await updateFotoPerfil(id, novoValor);
		} else {
			novoDado[campo] = novoValor;

			await updateDoc(funcionarioRef, novoDado);
			await adicionarNoHistorico(id, campo, novoValor);
		}

		return true;
	} catch (error) {
		console.error('Erro ao alterar dado do funcionário:', error);
		return false;
	}
}

export async function adicionarNoHistorico(
	id: string,
	campo: string,
	novoValor: string | File | number
) {
	try {
		const funcionarioRef = doc(tabelaFuncionarioRef, id);
		const funcionarioDoc = await getDoc(funcionarioRef);
		const funcionarioData = funcionarioDoc.data();
		let mensagem = '';
		if (campo === 'fotoPerfil') {
			mensagem = `O campo '${campo}' foi alterado.`;
		} else {
			mensagem = `O campo '${campo}' foi alterado para '${novoValor}'`;
		}
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

			return true;
		}
	} catch (error) {
		console.error('Erro ao adicionar entrada ao histórico:', error);
		return false;
	}
}

export async function updateFotoPerfil(id: string, foto: File): Promise<void> {
	try {
		const fotoPerfilRef = ref(storage, `imagensPerfil/${id}`);

		const metadata = {
			contentType: foto.type,
		};
		adicionarNoHistorico(id, 'fotoPerfil', foto);
		await uploadBytes(fotoPerfilRef, foto, metadata);
	} catch (error) {
		console.error('Erro ao atualizar a foto de perfil:', error);
		throw error;
	}
}
