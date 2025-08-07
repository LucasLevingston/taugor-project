import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

export const getAddressByZipCode = async (form: UseFormReturn) => {
  const zipCode = form.getValues('zipCode')

  const cleanZipCode = zipCode.replace(/\D/g, '')

  if (cleanZipCode.length !== 8) {
    toast.error('CEP Inválido')
    return
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cleanZipCode}/json/`
    )
    const data = await response.json()
    if (data.erro) {
      toast.error('ZIP code not found')
      return
    }
    form.setValue('street', data.logradouro || '', { shouldValidate: true })
    form.setValue('city', data.localidade || '', { shouldValidate: true })
    form.setValue('state', data.uf || '', { shouldValidate: true })
    toast.success('Address found')
  } catch (error: any) {
    toast.error('Erro ao buscar CEP: ', error.message)
  }
}
