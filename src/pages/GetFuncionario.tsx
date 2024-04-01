import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import { RxAvatar } from 'react-icons/rx';
import {
	desativarFuncionario,
	getFuncionarioPeloId,
} from '@/hooks/funcionarios.hooks';
import { useParams } from 'react-router-dom';
import Paginacao from '@/components/Paginacao';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import GerarPDF from '@/components/GerarPDF';
import BotaoAlterarDado from '@/components/BotaoAlterarDado';
import { DataFormatada, formatarCEP, formatarTelefone, win } from '@/estatico';
import { useAuthentication } from '@/hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function GetFuncionario() {
	const [formato, setFormato] = useState('rounded-none');
	const [pagina, setPagina] = useState(1);
	const [dadosAlterados, setDadosAlterados] = useState<{
		campo: string;
		novoValor: string | number;
	}>({ campo: '', novoValor: '' });

	const { id } = useParams<{ id: string }>();
	const { loading, user } = useAuthentication();

	if (id === null) {
		return <div>O ID não foi fornecido.</div>;
	}

	const funcionario = getFuncionarioPeloId(id);

	const handleChangePage = (page: number) => {
		setPagina(page);
	};

	function onChangeFoto() {
		if (formato == '') {
			setFormato('rounded-none');
		} else if (formato == 'rounded-none') {
			setFormato('');
		}
	}

	const handleChange = async (campo: string, valor: string | number) => {
		await setDadosAlterados({
			campo: campo,
			novoValor: valor,
		});
	};

	return (
		<div>
			<Header />
			{loading ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : user ? (
				funcionario ? (
					<div className="flex w-full flex-col items-center justify-center pb-3  ">
						<div className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor  p-5">
							<div className="flex items-center justify-between  ">
								<div>
									<Button
										onClick={() => {
											win.location = '/get-funcionarios';
										}}
										variant="outline"
									>
										<IoIosArrowBack className="mr-3" />
										Ver todos os Funcionarios
									</Button>
								</div>
								<div className="p-3 pb-3 text-[40px] font-bold text-mainColor">
									Dados do Funcionário
								</div>
								<div className=" flex items-center space-x-2 ">
									{/* <GerarPDF funcionario={funcionario} /> */}
									<Button
										variant="outline"
										className="text-vermelho"
										onClick={async () => {
											if (funcionario.id) {
												if (await desativarFuncionario(funcionario.id)) {
													win.location = '/get-funcionarios';
												}
											}
										}}
									>
										Desativar Funcionário <FaTrash className="ml-3" />
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
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.nome}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="nome"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.nome}
														/>
													</div>{' '}
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">Email</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.email}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="email"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.email}
														/>
													</div>{' '}
												</div>
												<div className="flex w-[90%]">
													<div className="w-[70%]">
														<div className="h-13 w-[90%]  bg-cinza p-2 ">
															<h1 className="text-xs font-bold">Rua</h1>

															<div className="flex items-center justify-between">
																<h2 className="text-lg">
																	{funcionario.endereco[0]}
																</h2>
																<BotaoAlterarDado
																	funcionario={funcionario}
																	field="endereco.0"
																	novoValor={dadosAlterados.novoValor as string}
																	handleChange={handleChange}
																	antigoValor={funcionario.endereco[0]}
																/>
															</div>
														</div>
													</div>
													<div className="w-[30%]">
														<div className="h-13 bg-cinza p-2 ">
															<h1 className="text-xs font-bold">Número</h1>
															<div className="flex items-center justify-between">
																<h2 className="text-lg">
																	{funcionario.endereco[1]}
																</h2>
																<BotaoAlterarDado
																	funcionario={funcionario}
																	field="endereco.1"
																	novoValor={dadosAlterados.novoValor as string}
																	handleChange={handleChange}
																	antigoValor={funcionario.endereco[1]}
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">CEP</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">
															{formatarCEP(funcionario.endereco[2])}
														</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="endereco.2"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.endereco[2]}
														/>
													</div>
												</div>
												<div className="flex w-[90%] justify-between">
													<div className="h-13 w-[50%] bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Cidade</h1>
														<div className="flex items-center justify-between">
															<h2 className="text-lg">
																{funcionario.endereco[3]}
															</h2>
															<BotaoAlterarDado
																funcionario={funcionario}
																field="endereco.3"
																novoValor={dadosAlterados.novoValor as string}
																handleChange={handleChange}
																antigoValor={funcionario.endereco[3]}
															/>
														</div>
													</div>
													<div className="h-13 w-[45%]  bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Estado</h1>
														<div className="flex items-center justify-between">
															<h2 className="text-lg">
																{funcionario.endereco[4]}
															</h2>
															<BotaoAlterarDado
																funcionario={funcionario}
																field="endereco.4"
																novoValor={dadosAlterados.novoValor as string}
																handleChange={handleChange}
																antigoValor={funcionario.endereco[4]}
															/>
														</div>{' '}
													</div>
												</div>
											</div>
										</div>
										<div className="flex w-[50%] flex-col ">
											<div className="w-full space-y-5">
												<div className="flex ">
													<Avatar
														className={`${formato} h-48 w-48 border-[4px]  border-mainColor`}
													>
														<AvatarImage
															className="h-full w-full"
															// src={funcionario.fotoPerfil}
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
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.sexo}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="sexo"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.sexo}
														/>
													</div>{' '}
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">
														Número de Celular
													</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">
															{formatarTelefone(funcionario.telefone)}
														</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="telefone"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.telefone}
														/>
													</div>
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">
														Data de Aniversário
													</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">
															{DataFormatada(funcionario.nascimento)}
														</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="nascimento"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.nascimento}
														/>
													</div>
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
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.setor}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="setor"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.setor}
														/>
													</div>{' '}
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">Cargo</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.cargo}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="cargo"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.cargo}
														/>
													</div>{' '}
												</div>
											</div>
										</div>
										<div className="flex w-[50%] flex-col ">
											<div className="w-full space-y-5">
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">Salário</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.salario}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="salario"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.salario}
														/>
													</div>
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">
														Data de Admissão
													</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">
															{funcionario.dataAdmissao}
														</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="dataAdmissao"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.dataAdmissao}
														/>
													</div>{' '}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
							<Paginacao onChangePage={handleChangePage} />
						</div>
					</div>
				) : null
			) : (
				<div className="flex items-center justify-center space-x-5 ">
					<div>Faça o login para Continuar </div>
					<Button
						variant="outline"
						onClick={() => {
							win.location = '/login';
						}}
					>
						Fazer login
					</Button>
				</div>
			)}
		</div>
	);
}
