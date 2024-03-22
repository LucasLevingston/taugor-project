import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../../Firebase/firebase';
import { useEffect, useState } from 'react';
import { DataTable, colunas } from './colunas';
import Header from '@/components/Header';

export default function GetFuncionarios() {
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

	useEffect(() => {
		const getFuncionarios = async () => {
			const data = await getDocs(funcionarioCollectionRef);
			const funcionarioData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as FuncionarioType[];
			setFuncionario(funcionarioData);
		};
		getFuncionarios();
	}, []);

	return (
		<div>
			<Header></Header>
			<DataTable columns={colunas} data={funcionario} />
		</div>
	);
}
