import { useParams } from 'react-router-dom';
import { getFuncionarioPeloId } from '@/hooks/getFuncionariosHooks';

export default function GetFuncionario(): any {
	const formatarData = (data: string): string => {
		if (!data) return '';

		const dia = data.substr(0, 2);
		const mes = data.substr(2, 2);
		const ano = data.substr(4, 4);

		return `${dia}/${mes}/${ano}`;
	};

	const { id } = useParams<{ id: string | undefined }>();
	if (typeof id == undefined) {
		return <div>O ID não foi fornecido.</div>;
	}
	const funcionario = getFuncionarioPeloId(id);
	console.log(funcionario);
	return (
		<div>
			<ul>
				{funcionario ? (
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
						<p>Data de Aniversário: {formatarData(funcionario.nascimento)}</p>
						<p>Cargo: {funcionario.cargo}</p>
						<p>Data de Admissão: {formatarData(funcionario.dataAdmissao)}</p>
						<p>Setor: {funcionario.setor}</p>
						<p>Salário: {funcionario.salario}</p>
					</li>
				) : (
					<div>Usuário não encontrado</div>
				)}
			</ul>
		</div>
	);
}
