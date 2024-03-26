import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Paginacao from './Paginacao';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';

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

// const [data, setData] = useState<FuncionarioType>();

const formSchema = z.object({
	nome: z
		.string()
		.min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
		.max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
	email: z.string().email({ message: 'Email inválido' }),
	sexo: z
		.string()
		.refine((value) => ['masculino', 'feminino'].includes(value), {
			message: 'Sexo inválido',
		}),
	endereco: z
		.array(z.string())
		.refine((value) => value.length === 5, { message: 'Endereço inválido' }),
	telefone: z.string().regex(/^\d{10,11}$/, { message: 'Telefone inválido' }),
	fotoPerfil: z.string().url({ message: 'URL da foto inválida' }),
	dataAniversario: z.string().refine(
		(value) => {
			const date = new Date(value);
			return !isNaN(date.getTime());
		},
		{ message: 'A data de aniversário deve estar em um formato válido' }
	),
});

type FormValues = z.infer<typeof formSchema>;

export default function CadastroFuncionario1() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: '',
			sexo: '',
			endereco: ['', '', '', '', ''],
			telefone: '',
			fotoPerfil: '',
			dataAniversario: '',
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: '',
			sexo: '',
			endereco: ['', '', '', '', ''],
			telefone: '',
			fotoPerfil: '',
			dataAniversario: '',
		},
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};
	// const uploadImage =

	return (
		<div>
			<Header />
			<div className="flex w-full flex-col items-center justify-center">
				<div className="rounded-t-3xl border-[4px]  p-3 pb-3 text-[30px] font-bold text-mainColor ">
					Cadasto de Funcionario
				</div>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-[50%] space-y-8 rounded-3xl border-[4px] border-mainColor p-5"
					>
						<div className="flex">
							<div className="flex w-[50%] flex-col ">
								<FormItem className="">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											className="w-[90%] border-[2px] border-mainColor text-preto"
											placeholder="Digite o nome"
											{...register('nome')}
										/>
									</FormControl>
									<FormMessage>{errors.nome?.message}</FormMessage>
								</FormItem>
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="w-[90%] border-[2px] border-mainColor text-preto"
											placeholder="Digite o Email"
											{...register('email')}
										/>
									</FormControl>
									<FormMessage>{errors.email?.message}</FormMessage>
								</FormItem>
							</div>
							<div className="flex w-[50%] flex-col ">
								<FormItem>
									<FormLabel>Foto de Perfil</FormLabel>
									<FormControl>
										<Controller
											name="fotoPerfil"
											control={form.control}
											render={({ field }) => (
												<input
													type="file"
													className="border-[2px] border-mainColor"
													{...field}
												/>
											)}
										/>
									</FormControl>
									<FormMessage>{errors.fotoPerfil?.message}</FormMessage>
								</FormItem>

								<FormItem>
									<FormLabel>Sexo</FormLabel>
									<Select>
										<SelectTrigger className="w-[180px] border-[2px] border-mainColor ">
											<SelectValue placeholder="Selecionar" />
										</SelectTrigger>
										<SelectContent className="bg-branco text-preto ">
											<SelectGroup>
												{sexoOpcoes.map((opcao) => (
													<SelectItem key={opcao.id} value={opcao.id}>
														{opcao.opcao}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormItem>
							</div>
						</div>
						<FormItem>
							<FormLabel>Endereço</FormLabel>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite a rua"
									{...register('endereco.0')}
								/>
							</FormControl>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite o numero"
									{...register('endereco.1')}
								/>
							</FormControl>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite o CEP"
									{...register('endereco.2')}
								/>
							</FormControl>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite o complemento"
									{...register('endereco.3')}
								/>
							</FormControl>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite a cidade"
									{...register('endereco.4')}
								/>
							</FormControl>
						</FormItem>

						{/* Campo Telefone */}
						<FormItem>
							<FormLabel>Telefone</FormLabel>
							<FormControl>
								<Input
									className="border-[2px] border-mainColor text-preto"
									placeholder="Digite o telefone"
									{...register('telefone')}
								/>
							</FormControl>
							<FormMessage>{errors.telefone?.message}</FormMessage>
						</FormItem>
						<FormItem>
							<FormLabel>Data de Aniversário</FormLabel>
							<FormControl>
								<Input
									type="date"
									className="border-[2px] border-mainColor text-preto"
									placeholder="Selecione a data"
									{...register('dataAniversario')}
								/>
							</FormControl>
							<FormMessage>{errors.dataAniversario?.message}</FormMessage>
						</FormItem>

						<Button variant="outline" type="submit">
							Continuar
						</Button>
						<Paginacao />
					</form>
				</Form>
			</div>
		</div>
	);
}
