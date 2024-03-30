import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import { RxAvatar } from 'react-icons/rx';
import { getFuncionarioPeloId } from '@/hooks/getFuncionariosHooks';
import { useParams } from 'react-router-dom';
import Paginacao from '@/pages/cadastro/Funcionario/Paginacao';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import GerarPDF from '@/components/GerarPDF';

export default function GetFuncionario() {
	const { id } = useParams<{ id: string | undefined }>();

	if (id === null) {
		return <div>O ID não foi fornecido.</div>;
	}

	const funcionario = getFuncionarioPeloId(id);

	const [pagina, setPagina] = useState(1);
	const handleChangePage = (page: number) => {
		setPagina(page);
	};

	const [fotoRedonda, setFotoRedonda] = useState(false);
	const [formato, setFormato] = useState('h-full w-48');

	function onChangeFoto() {
		if (fotoRedonda == true) {
			setFotoRedonda(false);
			setFormato('h-48 w-48 rounded-none');
		} else if (fotoRedonda == false) {
			setFotoRedonda(true);
			setFormato('h-48 w-48');
		}
	}

	const win: Window = window;

	return (
		<div>
			<Header />
			{funcionario ? (
				<div className="flex w-full flex-col items-center justify-center pb-3  ">
					<div className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor  p-5">
						<div className="flex items-center justify-between  ">
							<div>
								<Button
									onClick={() => {
										win.location = '/getFuncionarios';
									}}
									variant="outline"
								>
									<IoIosArrowBack className="mr-3" />
									Ver todos os Funcionarios
								</Button>
							</div>
							<div className="p-3 pb-3 text-[40px] font-bold text-mainColor">
								Funcionário
							</div>
							<div className=" flex items-center space-x-2 ">
								<GerarPDF />
								<Button variant="outline" className="text-vermelho">
									Deletar Funcionario <FaTrash className="ml-3" />
								</Button>
							</div>
						</div>
						{pagina == 1 ? (
							<div>
								<div className="pb-3 text-2xl font-bold">
									Informações de Contato
								</div>
								<div className="flex">
									<div className="flex w-[50%] flex-col">
										<div className="w-full space-y-5">
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Nome</h1>
												<h2 className="text-xl">{funcionario.nome}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Email</h1>
												<h2 className="text-xl">{funcionario.email}</h2>
											</div>
											<div className="flex w-[90%]">
												<div className="w-[70%]">
													<div className="h-13 w-[90%]  bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Rua</h1>
														<h2 className="text-xl">
															{funcionario.endereco[0]}
														</h2>
													</div>
												</div>
												<div className="w-[30%]">
													<div className="h-13 bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Número</h1>
														<h2 className="text-xl">
															{funcionario.endereco[1]}
														</h2>
													</div>
												</div>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">CEP</h1>
												<h2 className="text-xl">{funcionario.endereco[2]}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Cidade</h1>
												<h2 className="text-xl">{funcionario.endereco[3]}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Estado</h1>
												<h2 className="text-xl">{funcionario.endereco[4]}</h2>
											</div>
										</div>
									</div>
									<div className="flex w-[50%] flex-col ">
										<div className="w-full space-y-5">
											<div className="flex ">
												<Avatar
													className={`${formato} border-[4px] border-mainColor`}
												>
													<AvatarImage
														className="h-full w-full"
														src={funcionario.fotoPerfil}
													/>
													<AvatarFallback>
														<RxAvatar className="h-full w-full" />
													</AvatarFallback>
												</Avatar>
												<div className="ml-5">
													{' '}
													<h1 className="bg-cinza py-2 pl-2 text-xs font-bold">
														Foto de Perfil
													</h1>
													<div className="flex items-center justify-center space-x-4 pt-3">
														<Switch
															aria-readonly
															onCheckedChange={() => {
																onChangeFoto();
															}}
														/>
														<Label>Foto redonda</Label>
													</div>
												</div>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Sexo</h1>
												<h2 className="text-xl">{funcionario.sexo}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Número de Celular</h1>
												<h2 className="text-xl">{funcionario.telefone}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">
													Data de Aniversário
												</h1>
												<h2 className="text-xl">{funcionario.nascimento}</h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div>
								<div className="pb-3 text-2xl font-bold">
									Informações de Funcionário
								</div>
								<div className="flex">
									<div className="flex w-[50%] flex-col">
										<div className="w-full space-y-5">
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Setor</h1>
												<h2 className="text-xl ">{funcionario.setor}</h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Cargo</h1>
												<h2 className="text-xl">{funcionario.cargo}</h2>
											</div>
										</div>
									</div>
									<div className="flex w-[50%] flex-col ">
										<div className="w-full space-y-5">
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Salário</h1>
												<h2 className="text-xl">R$ {funcionario.salario} </h2>
											</div>
											<div className="h-13 w-[90%]  bg-cinza p-2 ">
												<h1 className="text-xs font-bold">Data de Admissão</h1>
												<h2 className="text-xl">{funcionario.dataAdmissao}</h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<Paginacao onChangePage={handleChangePage} />
					</div>
				</div>
			) : null}
		</div>
	);
}