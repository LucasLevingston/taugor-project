'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useUser } from '@/hooks/use-user'

// Esquema de validação para o formulário de perfil do usuário
const userProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .optional(),
  profilePicture: z.any().optional(), // Para o arquivo de upload
})

type UserProfileFormData = z.infer<typeof userProfileSchema>

export function ProfileSettings() {
  const { getUser, updateUser } = useUser()
  const user = getUser()
  const [preview, setPreview] = useState<string | null>(user?.photoURL || null)
  const [isRoundPhoto, setIsRoundPhoto] = useState(true)

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      profilePicture: undefined, // O campo de arquivo começa vazio
    },
    mode: 'onChange',
  })

  // Atualiza os valores do formulário e o preview da imagem quando o objeto 'user' muda
  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || '',
        profilePicture: undefined, // Sempre reseta o input de arquivo
      })
      setPreview(user.photoURL || null)
    }
  }, [user, form])

  const onSubmit = async (data: UserProfileFormData) => {
    if (!user) {
      toast.error('User not logged in.')
      return
    }

    try {
      // Prepara os dados para atualização
      const updates: Partial<z.infer<typeof userProfileSchema>> = {
        displayName: data.displayName,
      }

      // Chama a função updateUser do hook useAuth
      await updateUser(updates)

      toast.success('Profile updated successfully!')
      form.setValue('profilePicture', undefined) // Limpa o input de arquivo após o upload
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile', {
        description: 'Please check your input and try again.',
      })
    }
  }

  // Lida com a mudança do arquivo de imagem para exibir o preview
  // const handleFileChange = (file: File | undefined) => {
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string)
  //     }
  //     reader.readAsDataURL(file)
  //   } else {
  //     setPreview(user?.photoURL || null) // Volta para a URL original se o arquivo for limpo
  //   }
  // }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        User not found. Please log in.
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center space-y-4">
              <Avatar
                className={`h-48 w-48 bg-muted ${
                  isRoundPhoto ? 'rounded-full' : 'rounded-lg'
                }`}
              >
                <AvatarImage
                  className="h-full w-full object-cover"
                  src={
                    preview ||
                    '/placeholder.svg?height=192&width=192&query=user profile'
                  }
                />
                <AvatarFallback>
                  <UserRound className="h-48 w-48" />
                </AvatarFallback>
              </Avatar>
              <div className="w-full max-w-sm space-y-2">
                <CustomFormField
                  fieldType={FormFieldType.FILE_UPLOAD}
                  form={form}
                  label=""
                  name="profilePicture"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   const file = e.target.files?.[0]
                  //   form.setValue('profilePicture', file)
                  //   handleFileChange(file)
                  // }}
                  placeholder="Upload new profile picture"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isRoundPhoto}
                  onCheckedChange={setIsRoundPhoto}
                />
                <Label>Round photo</Label>
              </div>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              form={form}
              label="Name"
              name="displayName"
              placeholder="Enter your full displayName"
            />

            {/* Email field (read-only as email updates are a separate Firebase flow) */}
            <CustomFormField
              disabled={true}
              fieldType={FormFieldType.INPUT}
              form={form}
              label="Email"
              name={'email'} // Email is typically read-only for profile updates
              placeholder="Your email address" // Display current email
            />

            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
