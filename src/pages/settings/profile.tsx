import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useUser } from '@/hooks/use-user'

const userProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .optional(),
  email: z.email(),
  profilePicture: z.any().optional(),
})

type UserProfileFormData = z.infer<typeof userProfileSchema>

export function ProfileSettings() {
  const { updateUser, user } = useUser()
  const [, setPreview] = useState<string | null>(user?.photoURL || null)
  const [isRoundPhoto, setIsRoundPhoto] = useState(true)

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      profilePicture: undefined,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || '',
        profilePicture: undefined,
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
      const updates: Partial<z.infer<typeof userProfileSchema>> = {
        displayName: data.displayName,
      }

      await updateUser(updates)

      toast.success('Profile updated successfully!')
      form.setValue('profilePicture', undefined)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile', {
        description: 'Please check your input and try again.',
      })
    }
  }

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
              <div className="w-full max-w-sm space-y-2">
                <CustomFormField
                  fieldType={FormFieldType.FILE_UPLOAD}
                  form={form}
                  isAvatar={true}
                  label=""
                  name="profilePicture"
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

            <CustomFormField
              disabled={true}
              fieldType={FormFieldType.INPUT}
              form={form}
              label="Email"
              name={'email'}
              placeholder="Your email address"
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
