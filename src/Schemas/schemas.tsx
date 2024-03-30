import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

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
	telefone: z.string().regex(/^\d{10,11}$/, { message: 'Telefone inválido' }),
	fotoPerfil: z
		.any()
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, `A imagem ultrapassou o tamanho máximo de 5MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			'Apenas jpg, jpeg, png e webp são os formatos suportados.'
		)
		.optional(),
	nascimento: z.string().refine(
		(value) => {
			const date = new Date(value);
			return !isNaN(date.getTime());
		},
		{ message: 'A data de aniversário deve estar em um formato válido' }
	),
	setor: z.string().nonempty({ message: 'Selecione o setor' }),
	cargo: z.string().nonempty({ message: 'Selecione o cargo' }),
	salario: z.string().min(3, { message: 'Digite o salário' }),
	dataAdmissao: z.string().refine(
		(value) => {
			const dataAdmissao = new Date(value);
			return !isNaN(dataAdmissao.getTime());
		},
		{ message: 'A data de admissão deve estar em um formato válido' }
	),
});