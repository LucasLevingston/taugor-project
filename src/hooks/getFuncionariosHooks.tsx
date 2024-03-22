import { firebaseApp } from '@/Firebase/firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const db = getFirestore(firebaseApp);
const funcionarioCollectionRef = collection(db, 'funcionario');

type FuncionarioType = {
	id: string;
	nome: string;
	sexo: string;
	endereco: string[];
	telefone: string;
	fotoPerfil: string;
	nascimento: string;
	cargo: string;
	dataAdmissao: string;
	setor: string;
	salario: string;
};

const [funcionario, setFuncionario] = useState<FuncionarioType[]>([]);

export const getFuncionarios = useEffect(() => {
	const get = async () => {
		const data = await getDocs(funcionarioCollectionRef);
		const funcionarioData = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		})) as FuncionarioType[];
		setFuncionario(funcionarioData);
		return funcionario;
	};
	get();
}, []);
