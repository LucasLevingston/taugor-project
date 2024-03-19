import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../Firebase/firebase';
import { useEffect, useState } from 'react';

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
			<ul>
				{funcionario.map((funcionario) => (
					<li key={funcionario.id}>
						<p>ID: {funcionario.id}</p>
						<p>Nome: {funcionario.nome}</p>
						<p>Telefone: {funcionario.telefone}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
