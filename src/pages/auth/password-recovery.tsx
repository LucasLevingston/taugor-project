import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/custom-form-field'
import { CustomSubmitButton } from '@/components/form-components/custom-submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'

const recoverPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export function PasswordRecovery() {
  const { passwordRecover } = useAuth()
  const [isEmailSent, setIsEmailSent] = useState(false)

  const form = useForm<z.infer<typeof recoverPasswordSchema>>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof recoverPasswordSchema>) => {
    try {
      const result = await passwordRecover(values.email)

      toast.success(result)
      setIsEmailSent(true)
    } catch (error: any) {
      toast.error(`Error: ${error.data.message}`)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="flex w-[400px] flex-col gap-4" defaultValue="recover">
        <div className="grid w-full text-center font-bold">
          <h1 className="text-2xl text-black dark:text-white">
            Recuperar senha
          </h1>
        </div>
        <Card className="space-y-3">
          <CardHeader>
            <CardTitle>Recuperação de senha</CardTitle>
            <CardDescription>
              {isEmailSent
                ? 'Foi enviada uma mensagem para o seu email com as instruções necessárias.'
                : 'Digite seu email para recuperar a senha.'}
            </CardDescription>
          </CardHeader>
          {!isEmailSent && (
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardContent className="space-y-2">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    form={form}
                    name="email"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                  <CustomSubmitButton className="w-full">
                    Enviar email de recuperação
                  </CustomSubmitButton>
                </CardFooter>
              </form>
            </Form>
          )}
          <CardFooter className="flex flex-col items-center justify-center gap-4">
            <Separator />
            <Link className="text-[12px] text-blue-300" to="/login">
              Voltar para Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
