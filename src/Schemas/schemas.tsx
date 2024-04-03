import { z } from 'zod';

export const formSchema = z.object({
	nome: z
		.string()
		.min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
		.max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
	email: z.string().email({ message: 'Email inválido' }),
	sexo: z.string().nonempty({ message: 'Selecione o sexo' }),
	rua: z.string().min(1, { message: 'Digite o nome da rua' }),
	numero: z.string().min(1, { message: 'Digite o número' }),
	cep: z.string().min(8, { message: 'CEP inválido' }),
	cidade: z.string().min(1, { message: 'Digite o nome da cidade' }),
	estado: z.string().nonempty({ message: 'Selecione o estado' }),
	telefone: z.string().nonempty({ message: 'Selecione o estado' }),
	fotoPerfil: z.instanceof(File).optional(),
	nascimento: z.string().refine(
		(value) => {
			const date = new Date(value);
			return !isNaN(date.getTime());
		},
		{ message: 'A data de aniversário deve estar em um formato válido' }
	),
	setor: z.string().nonempty({ message: 'Selecione o setor' }),
	cargo: z.string().nonempty({ message: 'Selecione o cargo' }),
	salario: z.number().min(3, { message: 'Digite o salário' }),
	dataAdmissao: z.string().refine(
		(value) => {
			const dataAdmissao = new Date(value);
			return !isNaN(dataAdmissao.getTime());
		},
		{ message: 'A data de admissão deve estar em um formato válido' }
	),
});
