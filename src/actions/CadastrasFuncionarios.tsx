import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../Firebase/firebase';
import { useState } from 'react';
import { FuncionarioType } from '@/hooks/getFuncionariosHooks';

const CadastrarFuncionario = () => {
	const [funcionario, setFuncionario] = useState<FuncionarioType>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const camposPreenchidos = Object.values(funcionario).every(
			(value) => value !== ''
		);
		if (!camposPreenchidos) {
			alert(
				'Por favor, preencha todos os campos antes de enviar o formulário.'
			);
			return;
		}
		try {
			await addDoc(funcionariosCollectionRef, funcionario);
			alert('Funcionário cadastrado com sucesso!');
			setFuncionario({
				nome: '',
				sexo: '',
				endereco: ['', '', '', '', ''],
				telefone: '',
				fotoPerfil: '',
				nascimento: '',
				cargo: '',
				dataAdmissao: '',
				setor: '',
				salario: '',
			});
		} catch (error) {
			console.error('Erro ao cadastrar funcionário: ', error);
			alert('Erro ao cadastrar funcionário');
		}
	};

	return (
		<div>
			<h2>Cadastrar Funcionário</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={funcionario.nome}
					onChange={(e) =>
						setFuncionario({ ...funcionario, nome: e.target.value })
					}
					placeholder="Nome"
					required
				/>
				<select
					value={funcionario.sexo}
					onChange={(e) =>
						setFuncionario((prevState) => ({
							...prevState,
							sexo: e.target.value,
						}))
					}
				>
					<option value="">Selecione o sexo</option>
					<option value="Masculino">Masculino</option>
					<option value="Feminino">Feminino</option>
					<option value="Outro">Outro</option>
				</select>

				{funcionario.endereco.map((campo, index) => (
					<input
						key={index}
						type="text"
						value={campo}
						onChange={(e) => handleChange(e, index)}
						placeholder={` ${index === 0 ? 'Rua' : index === 1 ? 'Número' : index === 2 ? 'Cidade' : index === 3 ? 'Estado' : 'CEP'}`}
						required
					/>
				))}

				<input
					type="text"
					value={funcionario.telefone}
					onChange={(e) =>
						setFuncionario({ ...funcionario, telefone: e.target.value })
					}
					placeholder="Telefone"
					required
				/>
				<input
					type="text"
					value={funcionario.fotoPerfil}
					onChange={(e) =>
						setFuncionario({ ...funcionario, fotoPerfil: e.target.value })
					}
					placeholder="Foto de Perfil"
					required
				/>
				<input
					type="text"
					value={funcionario.nascimento}
					onChange={(e) =>
						setFuncionario({ ...funcionario, nascimento: e.target.value })
					}
					placeholder="Data de Aniversário"
					required
				/>
				<input
					type="text"
					value={funcionario.cargo}
					onChange={(e) =>
						setFuncionario({ ...funcionario, cargo: e.target.value })
					}
					placeholder="Cargo"
					required
				/>
				<input
					type="text"
					value={funcionario.dataAdmissao}
					onChange={(e) =>
						setFuncionario({ ...funcionario, dataAdmissao: e.target.value })
					}
					placeholder="Data de Admissão"
					required
				/>
				<input
					type="text"
					value={funcionario.setor}
					onChange={(e) =>
						setFuncionario({ ...funcionario, setor: e.target.value })
					}
					placeholder="Setor"
					required
				/>
				<input
					type="number"
					value={funcionario.salario}
					onChange={(e) =>
						setFuncionario({ ...funcionario, salario: e.target.value })
					}
					placeholder="Salário"
					required
				/>
				<button type="submit">Cadastrar</button>
			</form>
		</div>
	);
};

export default CadastrarFuncionario;
