import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { CustomSubmitButton } from '@/components/custom/form-components/custom-submit-button'
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
import { useFormProgressTracker } from '@/providers/progress-bar-provider'

const resetPasswordSchema = z
  .object({
    oobCode: z.string(),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmNewPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  })

export function ResetPassword() {
  const { resetPassword } = useAuth()

  const oobCode = new URLSearchParams(location.search).get('oobCode')

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oobCode: oobCode || '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })
  useFormProgressTracker(form)

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const result = await resetPassword({
        newPassword: values.newPassword,
        oobCode: values.oobCode,
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
                    name="confirmNewPassword"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                  <CustomSubmitButton className="w-full" form={form}>
                    Resetar senha
                  </CustomSubmitButton>
                </CardFooter>
              </form>
            </Form>
            <CardFooter className="flex flex-col items-center justify-center">
              <Link className="text-[12px]" to="/login">
                Voltar para login
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
