import { Button } from '@/components/ui/button';
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
import Header from '@/components/Header';
import Paginacao from './Paginacao';
import { IoSendOutline } from 'react-icons/io5';
import { FuncionarioType } from '@/hooks/getFuncionariosHooks';

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

const formSchema = z.object({
	setor: z.string(),
	cargo: z.string(),
	salario: z.number().min(3, { message: 'Digite o salario' }),
	dataAdmissao: z.string().refine(
		(value) => {
			const date = new Date(value);
			return !isNaN(date.getTime());
		},
		{ message: 'A data de admissao deve estar em um formato válido' }
	),
});

export default function CadastroFuncionario1() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			setor: '',
			cargo: '',
			dataAdmissao: '',
			salario: '',
		},
	});
	// const [funcionario, setFuncionario] = useState<FuncionarioType | null>(null);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		// const data1 = getFuncionario();
		setFuncionario({
			nome: data1.nome,
			email: data1.email,
			sexo: data1.sexo,
			endereco: data1.endereco,
			telefone: data1.telefone,
			fotoPerfil: data1.fotoPerfil,
			nascimento: data1.nascimento,
			cargo: data.cargo,
			dataAdmissao: data.dataAdmissao,
			setor: data.setor,
			salario: `${data.salario}`,
		});
		console.log('data', data);
	};

	return (
		<div>
			<Header />
			<div className="flex w-full flex-col items-center justify-center">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor p-5"
					>
						<div className="flex flex-col items-center rounded-t-3xl   p-3 pb-3 text-[30px] font-bold text-mainColor ">
							Cadastro de Funcionario
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
													className=" border-[2px] border-mainColor text-preto"
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
						<Button variant="outline" className="gap-1 px-5 py-4" type="submit">
							Continuar
							<IoSendOutline />
						</Button>
						<Paginacao />
					</form>
				</Form>
			</div>
		</div>
	);
}
