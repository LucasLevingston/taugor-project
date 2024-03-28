import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

export const formSchema1 = z.object({
	nome: z
		.string()
		.min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
		.max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
	email: z.string().email({ message: 'Email inválido' }),
	sexo: z.string(),
	rua: z.string().min(1, { message: 'Digite o nome da rua' }),
	numero: z.string().min(1, { message: 'Digite o número' }),
	cep: z.string().min(8, { message: 'CEP inválido' }),
	cidade: z.string().min(1, { message: 'Digite o nome da cidade' }),
	estado: z.string({ required_error: 'Selecione o estado' }),
	telefone: z.string().regex(/^\d{10,11}$/, { message: 'Telefone inválido' }),
	fotoPerfil: z
		.any()
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, `A imagem ultrapassou o tamanho maximo de 5MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			'Apenas jpg, jpeg, png e webp sao os formatos suportados.'
		),
	nascimento: z.string().refine(
		(value) => {
			const date = new Date(value);
			return !isNaN(date.getTime());
		},
		{ message: 'A data de aniversário deve estar em um formato válido' }
	),
	setor: z.string(),
	cargo: z.string(),
	salario: z.number().min(3, { message: 'Digite o salario' }),
	dataAdmissao: z.string().refine(
		(value) => {
			const dataAdmissao = new Date(value);
			return !isNaN(dataAdmissao.getTime());
		},
		{ message: 'A data de admissao deve estar em um formato válido' }
	),
});

export const formSchema2 = z.object({});
