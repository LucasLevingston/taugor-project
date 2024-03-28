import { Button } from '@/components/ui/button';
import { formSchema1, formSchema2 } from '../../../Schemas/schemas.tsx';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Paginacao from './Paginacao';
import { IoSendOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { FuncionarioType } from '@/hooks/getFuncionariosHooks.tsx';

const sexoOpcoes = [
	{
		id: 'masculino',
		opcao: 'Masculino',
	},
	{
		id: 'feminino',
		opcao: 'Feminino',
	},
];

const estadosBrasileiros = [
	{ label: 'Acre', value: 'AC' },
	{ label: 'Alagoas', value: 'AL' },
	{ label: 'Amapá', value: 'AP' },
	{ label: 'Amazonas', value: 'AM' },
	{ label: 'Bahia', value: 'BA' },
	{ label: 'Ceará', value: 'CE' },
	{ label: 'Distrito Federal', value: 'DF' },
	{ label: 'Espírito Santo', value: 'ES' },
	{ label: 'Goiás', value: 'GO' },
	{ label: 'Maranhão', value: 'MA' },
	{ label: 'Mato Grosso', value: 'MT' },
	{ label: 'Mato Grosso do Sul', value: 'MS' },
	{ label: 'Minas Gerais', value: 'MG' },
	{ label: 'Pará', value: 'PA' },
	{ label: 'Paraíba', value: 'PB' },
	{ label: 'Paraná', value: 'PR' },
	{ label: 'Pernambuco', value: 'PE' },
	{ label: 'Piauí', value: 'PI' },
	{ label: 'Rio de Janeiro', value: 'RJ' },
	{ label: 'Rio Grande do Norte', value: 'RN' },
	{ label: 'Rio Grande do Sul', value: 'RS' },
	{ label: 'Rondônia', value: 'RO' },
	{ label: 'Roraima', value: 'RR' },
	{ label: 'Santa Catarina', value: 'SC' },
	{ label: 'São Paulo', value: 'SP' },
	{ label: 'Sergipe', value: 'SE' },
	{ label: 'Tocantins', value: 'TO' },
] as const;

const cargoOpcoes = [
	{
		id: 'desenvolvedor',
		opcao: 'Desenvolvedor',
	},
	{
		id: 'analista',
		opcao: 'Analista de RH',
	},
	{
		id: 'contador',
		opcao: 'Contador',
	},
	{
		id: 'vendedor',
		opcao: 'Vendedor',
	},
];
const setorOpcoes = [
	{
		id: 'tecnologia',
		opcao: 'Tecnologia da Informação',
	},
	{
		id: 'rh',
		opcao: 'Recursos Humanos',
	},
	{
		id: 'financeiro',
		opcao: 'Financeiro',
	},
	{
		id: 'vendas',
		opcao: 'Vendas',
	},
];

// interface Cadastro1Type {
// 	nome: string;
// 	email: string;
// 	sexo: string;
// 	endereco: string[];
// 	telefone: string;
// 	fotoPerfil?: any;
// 	nascimento: string;
// }
function getImageData(event: ChangeEvent<HTMLInputElement>) {
	const dataTransfer = new DataTransfer();
	Array.from(event.target.files!).forEach((image) =>
		dataTransfer.items.add(image)
	);

	const files = dataTransfer.files;
	const displayUrl = URL.createObjectURL(event.target.files![0]);

	return { files, displayUrl };
}

export default function Formulario() {
	const [pagina, setPagina] = useState(1);
	const [preview, setPreview] = useState('');
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

	const [funcionario, setFuncionario] = useState<FuncionarioType | null>(null);
	const handleChangePage = (page: number) => {
		setPagina(page);
	};

	const form = useForm({
		resolver: zodResolver(formSchema1),
		defaultValues: {
			nome: '',
			email: '',
			sexo: '',
			rua: '',
			numero: '',
			cep: '',
			cidade: '',
			estado: '',
			telefone: '',
			fotoPerfil: undefined,
			nascimento: '',
			setor: '',
			cargo: '',
			dataAdmissao: '',
			salario: 0,
		},
	});
	useEffect(() => {
		console.log(funcionario);
	}, [funcionario]);

	const onSubmit = async (data: z.infer<typeof formSchema1>) => {
		if (pagina == 1) {
			setPagina(2);
		} else if (pagina == 2) {
			const endereco = [
				data.rua,
				data.numero,
				data.cep,
				data.cidade,
				data.estado,
			];
			setFuncionario({
				nome: data.nome,
				email: data.email,
				sexo: data.sexo,
				endereco: endereco,
				telefone: data.telefone,
				fotoPerfil: data.fotoPerfil,
				nascimento: data.nascimento,
				setor: data.setor,
				cargo: data.cargo,
				salario: data.salario,
				dataAdmissao: data.dataAdmissao,
			});
			console.log(data);
		}
	};

	{
		return (
			<div className="flex w-full flex-col items-center justify-center">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor p-5"
					>
						<div className="flex flex-col items-center rounded-t-3xl   p-3 pb-3 text-[30px] font-bold text-mainColor ">
							Cadastro de Funcionario
						</div>
						{pagina == 2 ? (
							<div>
								<div className="text-2xl font-bold">
									Informações do Funcionário
								</div>

								<div className="flex">
									<div className="flex w-[50%] flex-col">
										<FormField
											control={form.control}
											name="setor"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Setor</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="w-[180px] border-[2px] border-mainColor ">
																<SelectValue placeholder="Selecionar" />
															</SelectTrigger>
														</FormControl>
														<SelectContent
															className="bg-branco text-preto "
															{...field}
														>
															{setorOpcoes.map((opcao) => (
																<SelectItem key={opcao.id} value={opcao.id}>
																	{opcao.opcao}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="salario"
											render={({ field }) => (
												<FormItem className="w-[80%]">
													<FormLabel>Salario</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="number"
															className="border-[2px] border-mainColor text-preto"
															placeholder="Salario"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="flex w-[50%] flex-col">
										<FormField
											control={form.control}
											name="cargo"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Cargo</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="w-[180px] border-[2px] border-mainColor ">
																<SelectValue placeholder="Selecionar" />
															</SelectTrigger>
														</FormControl>
														<SelectContent
															className="bg-branco text-preto "
															{...field}
														>
															{cargoOpcoes.map((opcao) => (
																<SelectItem key={opcao.id} value={opcao.id}>
																	{opcao.opcao}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="dataAdmissao"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Data de Admissao</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="date"
															className="w-[80%] border-[2px] border-mainColor text-preto"
															placeholder="Selecione a data"
														/>
													</FormControl>
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<Button
									variant="outline"
									className="gap-1 px-5 py-4"
									type="submit"
								>
									Continuar
									<IoSendOutline />
								</Button>
								<Paginacao onChangePage={handleChangePage} />
							</div>
						) : (
							<div>
								<div className="text-2xl font-bold">
									Informações de Contato{' '}
								</div>
								<div className="flex">
									<div className="flex w-[50%] flex-col">
										<FormField
											control={form.control}
											name="nome"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nome</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="name"
															placeholder="Digite o nome"
															className="w-[90%] border-[2px] border-mainColor"
														></Input>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="w-[90%] border-[2px] border-mainColor text-preto"
															placeholder="Digite o Email"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex w-full ">
											<FormField
												control={form.control}
												name="rua"
												render={({ field }) => (
													<FormItem className="mr-5 w-[72%] flex-initial">
														<FormLabel>Rua</FormLabel>
														<FormControl>
															<Input
																{...field}
																className="border-[2px] border-mainColor text-preto"
																placeholder="Digite a rua"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="numero"
												render={({ field }) => (
													<FormItem className="w-[15%]">
														<FormLabel>Numero</FormLabel>
														<FormControl>
															<Input
																{...field}
																className=" border-[2px] border-mainColor text-preto"
																placeholder="Numero"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="w-[10%]"></div>
										</div>
										<FormField
											control={form.control}
											name="cep"
											render={({ field }) => (
												<FormItem>
													<FormLabel>CEP</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="w-[90%] border-[2px] border-mainColor text-preto"
															placeholder="Digite o CEP"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className=" w-[90%] justify-between align-bottom">
											<FormField
												control={form.control}
												name="cidade"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Cidade</FormLabel>
														<FormControl>
															<Input
																{...field}
																className="w-[100%] border-[2px] border-mainColor text-preto"
																placeholder="Digite a cidade"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="estado"
												render={({ field }) => (
													<FormItem className="flex flex-col pt-2 ">
														<FormLabel>Estado</FormLabel>
														<Popover open={open} onOpenChange={setOpen}>
															<PopoverTrigger
																asChild
																className="border-[2px] border-mainColor"
															>
																<FormControl>
																	<Button
																		variant="outline"
																		role="combobox"
																		aria-expanded={open}
																		className={cn('w-[200px] justify-between')}
																	>
																		{value
																			? estadosBrasileiros.find(
																					(estado) => estado.value === value
																				)?.label
																			: 'Selecione o estado'}
																		<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className="w-[200px] bg-branco p-0 text-preto">
																<Command>
																	<CommandInput placeholder="Selecione o estado" />
																	<CommandEmpty>
																		Estado nao encontrado
																	</CommandEmpty>
																	<CommandList className="">
																		<CommandGroup className="bg-branco font-bold text-preto ">
																			{estadosBrasileiros.map((estado) => (
																				<CommandItem
																					className="font-bold text-preto "
																					value={estado.value}
																					key={estado.value}
																					onSelect={(currentValue) => {
																						setValue(currentValue);
																						form.setValue(
																							'estado',
																							estado.value
																						);
																						setOpen(false);
																					}}
																				>
																					<Check
																						className={cn(
																							'mr-2 h-4 w-4',
																							estado.value === field.value
																								? 'opacity-100'
																								: 'opacity-0'
																						)}
																					/>
																					{estado.label}
																				</CommandItem>
																			))}
																		</CommandGroup>
																	</CommandList>
																</Command>
															</PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
									<div className="flex w-[50%] flex-col">
										<div className="">
											<FormField
												control={form.control}
												name="fotoPerfil"
												render={({ field: { onChange, value, ...field } }) => (
													<FormItem className="flex flex-col items-center justify-center ">
														<FormLabel htmlFor="picture">
															Foto de Perfil
														</FormLabel>{' '}
														<Avatar className="h-24 w-24 border-[4px] border-mainColor">
															<AvatarImage src={preview} />
															<AvatarFallback>
																<RxAvatar className="h-24 w-24" />
															</AvatarFallback>
														</Avatar>
														<FormControl>
															<Input
																type="file"
																{...field}
																onChange={(event) => {
																	const { files, displayUrl } =
																		getImageData(event);
																	setPreview(displayUrl);
																	onChange(files);
																}}
																className="w-[70%] rounded-full border-[2px] border-mainColor"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<FormField
											control={form.control}
											name="sexo"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Sexo</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="w-[180px] border-[2px] border-mainColor ">
																<SelectValue placeholder="Selecionar" />
															</SelectTrigger>
														</FormControl>
														<SelectContent
															className="bg-branco text-preto "
															{...field}
														>
															{sexoOpcoes.map((opcao) => (
																<SelectItem key={opcao.id} value={opcao.id}>
																	{opcao.opcao}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="telefone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Numero de celular</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="w-[90%] border-[2px] border-mainColor text-preto"
															placeholder="Digite o numero"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="nascimento"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Data de Aniversário</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="date"
															className="w-[90%] border-[2px] border-mainColor text-preto"
															placeholder="Selecione a data"
														/>
													</FormControl>
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<Button
									variant="outline"
									className="gap-1 px-5 py-4"
									type="submit"
								>
									Continuar
									<IoSendOutline />
								</Button>
								<Paginacao onChangePage={handleChangePage} />
							</div>
						)}
					</form>
				</Form>
			</div>
		);
	}
}
