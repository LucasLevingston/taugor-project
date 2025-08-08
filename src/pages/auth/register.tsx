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
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useFormProgressTracker } from '@/providers/progress-bar-provider'
import { registerSchema } from '@/schemas/auth/register-schema'

export function Register() {
  const { createUser } = useAuth()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpf: '',
      confirmPassword: '',
    },
  })
  useFormProgressTracker(form)

  async function onSubmit({
    cpf,
    email,
    name,
    password,
  }: z.infer<typeof registerSchema>) {
    try {
      const response = await createUser({
        name,
        email,
        cpf,
        password,
      })
      if (response) {
        toast.success('User registered successfully!')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        toast.error(response)
      }
    } catch (error) {
      if (error === 'Error: User already exists') {
        toast.error('Registration error: User already registered.')
      } else {
        toast.error(`Registration error: ${error}`)
      }
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[400px] flex-col gap-4" defaultValue="account">
        <div className="flex w-full justify-center">
          <h1 className="font-bold text-2xl">Registrar</h1>
        </div>
        <Card className="space-y-3">
          <CardHeader>
            <CardTitle>Registro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="name"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="email"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="cpf"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="password"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="confirmPassword"
                />
                <CustomSubmitButton className="w-full" form={form}>
                  Registrar
                </CustomSubmitButton>
                {/* <GoogleButton /> */}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-1">
            <Separator />
            <div className="flex flex-col items-center">
              <p className="text-sm">Já possui conta?</p>
              <Link className="text-[12px] text-blue-400 " to="/login">
                Faça login aqui
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
