import { Button } from '@/components/ui/button';
import { formSchema } from '../../../Schemas/schemas.tsx';
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
import { IoSendOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { ChangeEvent, useState } from 'react';
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
import {
	FuncionarioType,
	postFuncionario,
} from '@/hooks/getFuncionariosHooks.tsx';
import {
	cargoOpcoes,
	estadosBrasileiros,
	setorOpcoes,
	sexoOpcoes,
} from '@/static.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { Label } from '@/components/ui/label.tsx';

function getImagemData(event: ChangeEvent<HTMLInputElement>) {
	const dataTransfer = new DataTransfer();
	Array.from(event.target.files!).forEach((image) =>
		dataTransfer.items.add(image)
	);

	const files = dataTransfer.files;
	const displayUrl = URL.createObjectURL(event.target.files![0]);

	return { files, displayUrl };
}

export default function Formulario({
	onChangeProgresso,
}: {
	onChangeProgresso: (progresso: number) => void;
}) {
	const [pagina, setPagina] = useState(1);
	const [preview, setPreview] = useState('');
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [funcionario, setFuncionario] = useState<FuncionarioType | null>(null);
	const [fotoRedonda, setFotoRedonda] = useState(false);
	const [formato, setFormato] = useState('h-48 w-48 rounded-none');
	const [, setProgresso] = useState(0);
	const form = useForm({
		resolver: zodResolver(formSchema),
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
			salario: ``,
		},
	});
	const calcularProgresso = () => {
		const camposPreenchidos = Object.keys(form.getValues()).filter(
			(key) => form.getValues()[key as keyof typeof formSchema._output] !== ''
		);
		const totalCampos = Object.keys(form.getValues()).length;
		const novoProgresso = (camposPreenchidos.length / totalCampos) * 100;
		setProgresso(novoProgresso);
		onChangeProgresso(novoProgresso);
	};

	form.watch(() => {
		calcularProgresso();
	});

	function onChangeFoto() {
		if (fotoRedonda == true) {
			setFotoRedonda(false);
			setFormato('h-48 w-48 rounded-none');
		} else if (fotoRedonda == false) {
			setFotoRedonda(true);
			setFormato('h-48 w-48');
		}
	}

	function validarETransformarStringParaNumero(str: string): number | null {
		if (!isNaN(parseFloat(str))) {
			return parseFloat(str);
		} else {
			console.log('O salario deve ser apenas numeros!');
			return null;
		}
	}
	function formatarDataParaNumeros(data: string): string {
		return data.replace(/\D/g, '');
	}

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
			const salario = validarETransformarStringParaNumero(data.salario);

			if (salario !== null) {
				setFuncionario({
					nome: data.nome,
					email: data.email,
					sexo: data.sexo,
					endereco: endereco,
					telefone: data.telefone,
					nascimento: formatarDataParaNumeros(data.nascimento),
					setor: data.setor,
					cargo: data.cargo,
					salario: salario,
					dataAdmissao: formatarDataParaNumeros(data.dataAdmissao),
				});
				console.log(data);
			} else {
				console.error('O salário fornecido não é um número válido.');
			}
		}
		if (funcionario) {
			postFuncionario(funcionario, data.fotoPerfil);
		}
	};

	{
		return (
			<div className="flex w-full flex-col items-center justify-center">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[70%] space-y-8 rounded-3xl border-[4px] border-cinza p-5"
					>
						<div className="flex flex-col items-center rounded-t-3xl   p-3 pb-3 text-[30px] font-bold text-mainColor ">
							Cadastro de Funcionario
						</div>

						<div>
							<div className="pb-3 text-2xl  font-bold">
								Informações de Contato{' '}
							</div>
							<div className="flex">
								<div className="flex w-[50%] flex-col space-y-4">
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="nome"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>Nome</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="name"
															placeholder="Digite o nome"
															className="border-transparent bg-transparent "
														></Input>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="pl-3 text-sm">
											Ex.: David Nóbrega dos Santos
										</div>
									</div>
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="border-transparent bg-transparent "
															placeholder="Digite o Email"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="pl-3 text-sm">
											Ex.: davidnobrega87@gmail.com
										</div>
									</div>
									<div className="flex w-[90%] ">
										<div className=" w-[75%] space-y-1 ">
											<FormField
												control={form.control}
												name="rua"
												render={({ field }) => (
													<FormItem className="mr-5 flex-initial bg-cinza p-2">
														<FormLabel>Rua</FormLabel>
														<FormControl>
															<Input
																{...field}
																className="border-transparent bg-transparent "
																placeholder="Digite a rua"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="pl-3 text-sm">
												Ex.: Pedro Marinho da Nóbrega
											</div>
										</div>
										<div className="space-y-1">
											<FormField
												control={form.control}
												name="numero"
												render={({ field }) => (
													<FormItem className=" bg-cinza p-2">
														<FormLabel>Numero</FormLabel>
														<FormControl>
															<Input
																{...field}
																className="border-transparent bg-transparent "
																placeholder="Numero"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="pl-3 text-sm">Ex.: 70.</div>
										</div>
									</div>
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="cep"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>CEP</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="border-transparent bg-transparent "
															placeholder="Digite o CEP"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="pl-3 text-sm">Ex.: 58400-261</div>
									</div>
									<div className="flex w-[90%] justify-between align-bottom">
										<div className="w-[45%] space-y-1">
											<FormField
												control={form.control}
												name="cidade"
												render={({ field }) => (
													<FormItem className=" bg-cinza p-2">
														<FormLabel>Cidade</FormLabel>
														<FormControl>
															<Input
																{...field}
																className="border-transparent bg-transparent "
																placeholder="Digite a cidade"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="pl-3 text-sm">Ex.: Texeira</div>
										</div>
										<div className="w-[45%] space-y-1 ">
											<FormField
												control={form.control}
												name="estado"
												render={({ field }) => (
													<FormItem className="flex flex-col bg-cinza p-4">
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
																		className={cn(
																			'w-[200px] justify-between border-preto '
																		)}
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
											<div className="pl-3 text-sm">Ex.: Paraíba</div>
										</div>
									</div>
								</div>
								<div className="flex w-[50%] flex-col space-y-4">
									<div className="">
										<FormField
											control={form.control}
											name="fotoPerfil"
											render={({ field: { onChange, value, ...field } }) => (
												<FormItem className="flex  ">
													<Avatar
														className={`${formato}  border-[2px] border-cinza bg-cinza`}
													>
														<AvatarImage
															className="h-full w-full"
															src={preview}
														/>
														<AvatarFallback>
															<RxAvatar className="h-full w-full" />
														</AvatarFallback>
													</Avatar>
													<div className="ml-5">
														<div className="w- flex flex-col space-y-2 bg-cinza p-4">
															<h1 className=" text-xs font-bold">
																Foto de Perfil
															</h1>{' '}
															<FormControl className="">
																<Input
																	type="file"
																	{...field}
																	onChange={(event) => {
																		const { files, displayUrl } =
																			getImagemData(event);
																		setPreview(displayUrl);
																		onChange(files);
																	}}
																	className="border-[2px] bg-cinza font-bold text-preto"
																/>
															</FormControl>
														</div>
														<div className="flex  space-x-4 pt-3">
															<Switch
																aria-readonly
																onCheckedChange={() => {
																	onChangeFoto();
																}}
															/>
															<Label>Foto redonda</Label>
														</div>
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="sexo"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>Sexo</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="w-[180px] border-[2px]  ">
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
										<div className="pl-3 text-sm">
											Ex.: Masculino ou feminino.
										</div>
									</div>
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="telefone"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>Numero de celular</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="border-transparent bg-transparent "
															placeholder="Digite o numero"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="pl-3 text-sm">Ex.: (83) 99961-6220</div>
									</div>
									<div className="space-y-1">
										<FormField
											control={form.control}
											name="nascimento"
											render={({ field }) => (
												<FormItem className="w-[90%] bg-cinza p-2">
													<FormLabel>Data de Aniversário</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="date"
															className="w-[50%] border-[2px] bg-cinza "
															placeholder="Selecione a data"
														/>
													</FormControl>
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
										<div className="pl-3 text-sm">Ex.: 28/10/2002</div>
									</div>
								</div>
							</div>
							<div className="pb-5">
								<div className="pb-3 pt-5 text-2xl  font-bold">
									Informações do Funcionário
								</div>

								<div className="flex">
									<div className="flex w-[50%] flex-col space-y-4">
										<div className="space-y-1">
											<FormField
												control={form.control}
												name="setor"
												render={({ field }) => (
													<FormItem className=" w-[90%] bg-cinza p-2">
														<FormLabel>Setor</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger className="w-[180px] border-[2px]  ">
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
											<div className="pl-3 text-sm">Ex.: Vendas</div>
										</div>
										<div className="space-y-1">
											<FormField
												control={form.control}
												name="salario"
												render={({ field }) => (
													<FormItem className="w-[90%]  bg-cinza p-2">
														<FormLabel>Salario</FormLabel>
														<FormControl>
															<Input
																{...field}
																type="text"
																className="border-transparent bg-transparent "
																placeholder="Salario"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="pl-3 text-sm">Ex.: R$ 1,200</div>
										</div>
									</div>
									<div className="flex w-[50%] flex-col space-y-4">
										<div className="space-y-1">
											<FormField
												control={form.control}
												name="cargo"
												render={({ field }) => (
													<FormItem className="w-[90%] bg-cinza p-2">
														<FormLabel>Cargo</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger className="w-[180px] border-[2px]  ">
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
											<div className="pl-3 text-sm">Ex.: Contador</div>
										</div>
										<div className="space-y-1">
											<FormField
												control={form.control}
												name="dataAdmissao"
												render={({ field }) => (
													<FormItem className="w-[90%] bg-cinza p-2">
														<FormLabel>Data de Admissao</FormLabel>
														<FormControl>
															<Input
																{...field}
																type="date"
																className="w-[50%] border-[2px] bg-cinza "
																placeholder="Selecione a data"
															/>
														</FormControl>
														<FormMessage></FormMessage>
													</FormItem>
												)}
											/>
											<div className="pl-3 text-sm">Ex.: 29/03/2024</div>
										</div>
									</div>
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
						</div>
					</form>
				</Form>
			</div>
		);
	}
}
