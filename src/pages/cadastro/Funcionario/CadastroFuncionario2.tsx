import { formSchema2 } from '../../../Schemas/schemas.tsx';
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
import { Button } from '@/components/ui/button.tsx';
import { IoSendOutline } from 'react-icons/io5';
import Paginacao from './Paginacao.tsx';

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
export default function CadastroFuncionario2() {
	const form2 = useForm({
		resolver: zodResolver(formSchema2),
		defaultValues: {
			setor: '',
			cargo: '',
			dataAdmissao: '',
			salario: '',
		},
	});

	const onSubmit2 = async (data: z.infer<typeof formSchema2>) => {
		// setFuncionario({
		// 	nome: funcionarioF1.nome,
		// 	email: funcionarioF1.email,
		// 	sexo: funcionarioF1.sexo,
		// 	endereco: funcionarioF1.endereco,
		// 	telefone: funcionarioF1.telefone,
		// 	fotoPerfil: funcionarioF1.fotoPerfil,
		// 	nascimento: funcionarioF1.nascimento,
		// 	setor: data.setor,
		// 	cargo: data.cargo,
		// 	dataAdmissao: data.dataAdmissao,
		// 	salario: data.salario,
		// });
	};
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<Form {...form2}>
				<form
					onSubmit={form2.handleSubmit(onSubmit2)}
					className="w-[70%] space-y-8 rounded-3xl border-[4px] border-mainColor p-5"
				>
					<div className="flex flex-col items-center rounded-t-3xl   p-3 pb-3 text-[30px] font-bold text-mainColor ">
						Cadastro de Funcionario
					</div>
					<div className="text-2xl font-bold">Informações do Funcionário</div>

					<div className="flex">
						<div className="flex w-[50%] flex-col">
							<FormField
								control={form2.control}
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
								control={form2.control}
								name="salario"
								render={({ field }) => (
									<FormItem className="w-[80%]">
										<FormLabel>Salario</FormLabel>
										<FormControl>
											<Input
												type="number"
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
								control={form2.control}
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
								control={form2.control}
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
	);
}
