import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import type { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { CustomSubmitButton } from '@/components/custom/form-components/custom-submit-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useFormProgressTracker } from '@/providers/progress-bar-provider'
import { loginSchema } from '@/schemas/auth/login-schema'

export function LoginPage() {
  const { login } = useAuth()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  useFormProgressTracker(form)

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login({ email: values.email, password: values.password })
    } catch (error: any) {
      return toast.error(error.message)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[400px] flex-col gap-2">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl ">Faça o login na sua conta</h1>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  className="space-y-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    form={form}
                    name="email"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    form={form}
                    name="password"
                  />
                  <CustomSubmitButton className="w-full" form={form}>
                    Entrar
                  </CustomSubmitButton>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-2">
              <Separator className="my-2" />

              <div className="mt-2">
                <Link
                  className="text-[12px] text-blue-300"
                  to="/password-recovery"
                >
                  Esqueceu a senha? Clique aqui para recuperar
                </Link>
              </div>
            </CardFooter>

            <CardFooter className="flex flex-col items-center justify-center">
              <Label>Não possui conta?</Label>
              <Link className="text-[12px] text-blue-300" to="/register">
                Registre aqui!
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
