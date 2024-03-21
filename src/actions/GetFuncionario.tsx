import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../Firebase/firebase';
import { useEffect, useState } from 'react';
import { useParams, redirect } from 'react-router-dom';

export default function GetFuncionario(): any {
	const { id } = useParams<{ id: string }>();
	const db = getFirestore(firebaseApp);
	const funcionarioCollectionRef = collection(db, 'funcionario');

	const formatarData = (data: string): string => {
		if (!data) return '';

		const dia = data.substr(0, 2);
		const mes = data.substr(2, 2);
		const ano = data.substr(4, 4);

		return `${dia}/${mes}/${ano}`;
	};

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

	if (id === undefined) {
		return redirect('/GetFuncionarios');
	}

	useEffect(() => {
		const getFuncionarios = async () => {
			try {
				const data = await getDocs(funcionarioCollectionRef);
				const funcionarioData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as FuncionarioType[];
				setFuncionario(funcionarioData);
			} catch (error) {
				console.log(error);
			}
		};
		getFuncionarios();
	}, [funcionarioCollectionRef]);

	return (
		<div>
			<ul>
				{funcionario.some((funcionario) => funcionario.id === id) ? (
					funcionario.map((funcionario) =>
						funcionario.id === id ? (
							<li key={funcionario.id}>
								<p
								// onClick={handleClick}
								>
									Nome: {funcionario.nome}
								</p>
								<p>Sexo: {funcionario.sexo}</p>
								<p>
									Endereço:
									<br />
									Rua: {funcionario.endereco[0]}
									<br />
									Numero: {funcionario.endereco[1]}
									<br />
									Cidade: {funcionario.endereco[2]}
									<br />
									Estado: {funcionario.endereco[3]}
									<br />
									CEP: {funcionario.endereco[4]}
								</p>
								<p>Telefone: {funcionario.telefone}</p>
								<p>Foto de Perfil: {funcionario.fotoPerfil}</p>
								<p>
									Data de Aniversário: {formatarData(funcionario.nascimento)}
								</p>
								<p>Cargo: {funcionario.cargo}</p>
								<p>
									Data de Admissão: {formatarData(funcionario.dataAdmissao)}
								</p>
								<p>Setor: {funcionario.setor}</p>
								<p>Salário: {funcionario.salario}</p>
							</li>
						) : null
					)
				) : (
					<div>Usuário não encontrado</div>
				)}
			</ul>
		</div>
	);
}
