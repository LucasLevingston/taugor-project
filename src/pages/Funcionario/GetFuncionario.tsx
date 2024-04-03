import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import { RxAvatar } from 'react-icons/rx';
import {
	desativarFuncionario,
	getFuncionarioPeloId,
} from '@/hooks/funcionarios.hooks';
import { Link, useParams } from 'react-router-dom';
import Paginacao from '@/components/Paginacao';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaRegFilePdf, FaTrash } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import BotaoAlterarDado from '@/components/BotaoAlterarDado';
import { DataFormatada, formatarTelefone } from '@/estatico';
import { useAuntenticacao } from '@/hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';
import BotaoMostrarHistorico from '@/components/BotaoMostrarHistorico';
import { Toaster, toast } from 'sonner';

export default function GetFuncionario() {
	const [formato, setFormato] = useState('rounded-none h-56');
	const [pagina, setPagina] = useState(1);
	const [dadosAlterados, setDadosAlterados] = useState<{
		campo: string;
		novoValor: string | File | number;
	}>({ campo: '', novoValor: '' });
	const { id } = useParams<{ id: string }>();
	const funcionario = getFuncionarioPeloId(id);

	const { carregando, usuario } = useAuntenticacao();

	const handleChangePage = (page: number) => {
		setPagina(page);
	};

	function onChangeFoto() {
		if (formato == 'h-48') {
			setFormato('rounded-none h-56');
		} else if (formato == 'rounded-none h-56') {
			setFormato('h-48');
		}
	}

	const handleChange = async (campo: string, valor: string | File | number) => {
		await setDadosAlterados({
			campo: campo,
			novoValor: valor,
		});
	};

	return (
		<div>
			<Toaster richColors position="top-right" />
			<Header />
			{carregando ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : usuario ? (
				funcionario ? (
					<div className="flex w-full flex-col items-center justify-center pb-3  ">
						<div className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor  p-5">
							<div className="flex items-center justify-between  ">
								<div className="flex items-center space-x-2">
									<Button variant="outline">
										<Link
											to="/get-funcionarios"
											className="flex items-center justify-center"
										>
											<IoIosArrowBack className="mr-3" />
											Ver todos os Funcionarios
										</Link>
									</Button>
									<BotaoMostrarHistorico funcionario={funcionario} />
								</div>
								<div className="p-3 pb-3 text-[40px] font-bold text-mainColor">
									Dados do Funcionário
								</div>
								<div className=" flex items-center space-x-2 ">
									<Button
										variant="outline"
										className="flex  items-center space-x-6"
									>
										<Link
											to={`/gerar-pdf/${id}`}
											className="flex  items-center space-x-7 "
										>
											Gerar PDF
											<FaRegFilePdf />
										</Link>
									</Button>
									<Button
										variant="outline"
										className="text-vermelho"
										onClick={async () => {
											if (funcionario.id) {
												if (await desativarFuncionario(funcionario.id)) {
													toast.error('Funcionário desativado');
													setTimeout(() => {
														window.location.href = '/';
													}, 2000);
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
																<h2 className="text-lg">{funcionario.rua}</h2>
																<BotaoAlterarDado
																	funcionario={funcionario}
																	field="rua"
																	novoValor={dadosAlterados.novoValor as string}
																	handleChange={handleChange}
																	antigoValor={funcionario.rua}
																/>
															</div>
														</div>
													</div>
													<div className="w-[30%]">
														<div className="h-13 bg-cinza p-2 ">
															<h1 className="text-xs font-bold">Número</h1>
															<div className="flex items-center justify-between">
																<h2 className="text-lg">
																	{funcionario.numero}
																</h2>
																<BotaoAlterarDado
																	funcionario={funcionario}
																	field="numero"
																	novoValor={dadosAlterados.novoValor as string}
																	handleChange={handleChange}
																	antigoValor={funcionario.numero}
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="h-13 w-[90%]  bg-cinza p-2 ">
													<h1 className="text-xs font-bold">CEP</h1>
													<div className="flex items-center justify-between">
														<h2 className="text-lg">{funcionario.cep}</h2>
														<BotaoAlterarDado
															funcionario={funcionario}
															field="cep"
															novoValor={dadosAlterados.novoValor as string}
															handleChange={handleChange}
															antigoValor={funcionario.cep}
														/>
													</div>
												</div>
												<div className="flex w-[90%] justify-between">
													<div className="h-13 w-[50%] bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Cidade</h1>
														<div className="flex items-center justify-between">
															<h2 className="text-lg">{funcionario.cidade}</h2>
															<BotaoAlterarDado
																funcionario={funcionario}
																field="cidade"
																novoValor={dadosAlterados.novoValor as string}
																handleChange={handleChange}
																antigoValor={funcionario.cidade}
															/>
														</div>
													</div>
													<div className="h-13 w-[45%]  bg-cinza p-2 ">
														<h1 className="text-xs font-bold">Estado</h1>
														<div className="flex items-center justify-between">
															<h2 className="text-lg">{funcionario.estado}</h2>
															<BotaoAlterarDado
																funcionario={funcionario}
																field="estado"
																novoValor={dadosAlterados.novoValor as string}
																handleChange={handleChange}
																antigoValor={funcionario.estado}
															/>
														</div>{' '}
													</div>
												</div>
											</div>
										</div>
										<div className="flex w-[50%] flex-col ">
											<div className="w-full space-y-5 ">
												<div className="flex w-[90%] justify-between space-x-4 bg-cinza p-2">
													<div className="flex space-x-4">
														<div className="flex flex-col  space-x-2">
															<h1 className="py-2 pl-2 text-xs font-bold">
																Foto de Perfil
															</h1>
															<Avatar
																className={`${formato}  w-48 border-[4px]  border-mainColor`}
															>
																<AvatarImage
																	className="h-full w-full"
																	src={funcionario.fotoPerfilUrl}
																/>
																<AvatarFallback>
																	<RxAvatar className="h-full w-full" />
																</AvatarFallback>
															</Avatar>
														</div>
														<div className="flex justify-center space-x-4 pt-10">
															<Switch
																aria-readonly
																className=""
																onCheckedChange={() => {
																	onChangeFoto();
																}}
															/>
															<Label>Foto redonda</Label>
														</div>
													</div>
													<BotaoAlterarDado
														funcionario={funcionario}
														field="fotoPerfil"
														novoValor={dadosAlterados.novoValor as File}
														handleChange={handleChange}
														antigoValor={funcionario.fotoPerfilUrl}
													/>
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
												<div className="flex w-[90%] justify-between">
													<div className="h-13 w-[50%]  bg-cinza p-2 ">
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
													<div className="h-13 w-[45%]  bg-cinza p-2 ">
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
														<h2 className="text-lg">
															R$ {funcionario.salario}
														</h2>
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
															{DataFormatada(funcionario.dataAdmissao)}
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
					<Button variant="outline">
						<Link to="/login">Fazer login</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
