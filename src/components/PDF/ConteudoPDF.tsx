import React from 'react';
import {
	DataFormatada,
	formatarDataHistorico,
	formatarTelefone,
} from '@/estatico';
import { FuncionarioType } from '@/hooks/funcionarios.hooks';

interface ConteudoPDFProps {
	funcionario: FuncionarioType;
}

export const ConteudoPDF: React.FC<ConteudoPDFProps> = ({ funcionario }) => {
	return (
		<div id="conteudoPDF" className="m-24 space-y-16 p-20" key={funcionario.id}>
			<div className="w-full ">
				<div className="pb-7 text-7xl font-bold">Informações de Contato</div>
				<div className="flex">
					<div className="flex w-[60%] flex-col ">
						<div className="w-full space-y-10">
							<div className="h-13 p-2 ">
								<h1 className="text-2xl font-bold">Nome</h1>
								<h2 className="text-3xl">{funcionario.nome}</h2>
							</div>
							<div className="h-13 p-2 ">
								<h1 className="text-2xl font-bold">Email</h1>
								<h2 className="text-3xl">{funcionario.email}</h2>
							</div>
							<div className="flex space-x-10 ">
								<div className="h-13  p-2">
									<h1 className="text-2xl font-bold">Rua</h1>
									<h2 className="text-3xl">{funcionario.rua}</h2>
								</div>
								<div className="h-13 p-2 ">
									<h1 className="text-2xl font-bold">Número</h1>
									<h2 className="text-3xl">{funcionario.numero}</h2>
								</div>
							</div>
							<div className="h-13  p-2 ">
								<h1 className="text-2xl font-bold">CEP</h1>
								<h2 className="text-3xl">{funcionario.cep}</h2>
							</div>
							<div className="flex space-x-10">
								<div className="h-13 w-[40%] p-2">
									<h1 className="text-2xl font-bold">Cidade</h1>
									<h2 className="text-3xl">{funcionario.cidade}</h2>
								</div>
								<div className="h-13  p-2 ">
									<h1 className="text-2xl font-bold">Estado</h1>
									<h2 className="text-3xl">{funcionario.estado}</h2>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-10  p-2">
						<div className="p-2">
							<h1 className="text-2xl font-bold">Sexo</h1>
							<h2 className="text-3xl">{funcionario.sexo}</h2>
						</div>
						<div className="p-2">
							<h1 className="text-2xl font-bold">Número de Celular</h1>
							<h2 className="text-3xl">
								{formatarTelefone(funcionario.telefone)}
							</h2>
						</div>
						<div className="p-2">
							<h1 className="text-2xl font-bold">Data de Aniversário</h1>
							<h2 className="text-3xl">
								{DataFormatada(funcionario.nascimento)}
							</h2>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full">
				<div className="pb-7 text-7xl font-bold">
					Informações de Funcionário
				</div>
				<div className="flex w-full">
					<div className=" w-[60%] space-y-10 ">
						<div className="h-13  p-2 ">
							<h1 className="text-2xl font-bold">Setor</h1>
							<h2 className="text-3xl">{funcionario.setor}</h2>
						</div>
						<div className="h-13  p-2 ">
							<h1 className="text-2xl font-bold">Cargo</h1>

							<h2 className="text-3xl">{funcionario.cargo}</h2>
						</div>
					</div>
					<div className="space-y-10">
						<div className="h-13  p-2 ">
							<h1 className="text-2xl font-bold">Salário</h1>
							<h2 className="text-3xl">R$ {funcionario.salario}</h2>
						</div>
						<div className="h-13  p-2 ">
							<h1 className="text-2xl font-bold">Data de Admissão</h1>
							<h2 className="text-3xl">
								{DataFormatada(funcionario.dataAdmissao)}
							</h2>
						</div>
					</div>
				</div>
			</div>
			<div className=" flex flex-col space-y-10 p-2">
				<div className="pb-7 text-7xl font-bold">Histórico:</div>
				{funcionario.historico.map((caso) => (
					<div key={caso.data} className="">
						<h1 className="text-3xl font-bold">
							Ocorrido:<span className="font-normal"> {caso.ocorrido}</span>
						</h1>
						<h2 className=" py-10  text-3xl font-bold">
							Data:
							<span className="font-normal">
								{' '}
								{formatarDataHistorico(caso.data)}
							</span>
						</h2>
					</div>
				))}
			</div>
		</div>
	);
};

export default ConteudoPDF;
