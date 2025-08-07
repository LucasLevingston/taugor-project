import { z } from 'zod'

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  gender: z.string().nonempty({ message: 'Selecione o sexo' }),
  street: z.string().min(1, { message: 'Digite o nome da rua' }),
  number: z.string().nonempty({ message: 'Número inválido' }),
  zipCode: z.string().min(8, { message: 'CEP inválido' }),
  city: z.string().min(1, { message: 'Digite o nome da cidade' }),
  state: z.string().nonempty({ message: 'Selecione o estado' }),
  phoneNumber: z.string().nonempty({ message: 'Selecione o estado' }),
  profilePicture: z.instanceof(File).optional(),
  birthDate: z.string().refine(
    value => {
      const date = new Date(value)
      return date.getTime()
    },
    { message: 'A data de aniversário deve estar em um formato válido' }
  ),
  department: z.string().nonempty({ message: 'Selecione o setor' }),
  position: z.string().nonempty({ message: 'Selecione o cargo' }),
  salary: z.number().min(3, { message: 'Digite o salário' }),
  admissionDate: z.string().refine(
    value => {
      const dataAdmissao = new Date(value)
      return dataAdmissao.getTime()
    },
    { message: 'A data de admissão deve estar em um formato válido' }
  ),
})
