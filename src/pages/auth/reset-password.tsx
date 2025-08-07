import { zodResolver } from '@hookform/resolvers/zod'
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
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'

const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function ResetPassword() {
  const { resetPassword } = useAuth()

  const token = new URLSearchParams(location.search).get('token')

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const result = await resetPassword({
        password: values.password,
        token: values.token,
      })
      toast.success(result)
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (error: any) {
      toast.error('Error', error.data.message.error)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Tabs className="w-[400px]" defaultValue="reset">
        <TabsList className="grid w-full bg-background">
          <Label className="text-2xl">Criar nova senha</Label>
        </TabsList>
        <TabsContent value="reset">
          <Card>
            <CardHeader>
              <CardTitle>Criar nova senha</CardTitle>
              <CardDescription>Digite sua nova senha.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardContent className="space-y-2">
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
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                  <CustomSubmitButton className="w-full">
                    Resetar senha
                  </CustomSubmitButton>
                </CardFooter>
              </form>
            </Form>
            <CardFooter className="flex flex-col items-center justify-center">
              <Link className="text-[12px] text-mainColor" to="/login">
                Voltar para login
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
