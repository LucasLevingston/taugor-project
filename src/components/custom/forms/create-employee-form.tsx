import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, MapPin, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxAvatar } from 'react-icons/rx'
import { toast } from 'sonner'
import { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEmployees } from '@/hooks/use-employee'
import { brazilianStates } from '@/lib/utils/brazilian-states'
import { departmentOptions } from '@/lib/utils/department-options'
import { genderOptions } from '@/lib/utils/gender-options'
import { positionOptions } from '@/lib/utils/positions-options'
import { createEmployeeSchema } from '@/schemas/schemas'
import { CustomSubmitButton } from '../form-components/custom-submit-button'

type EmployeeFormData = z.infer<typeof createEmployeeSchema>

// function getImageData(event: ChangeEvent<HTMLInputElement>) {
//   if (!event.target.files?.[0]) return null

//   const file = event.target.files[0]
//   const displayUrl = URL.createObjectURL(file)
//   return { file, displayUrl }
// }

export function CreateEmployeeForm() {
  const [preview, setPreview] = useState('')
  const [isRoundPhoto, setIsRoundPhoto] = useState(false)
  const [noStreetNumber, setNoStreetNumber] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const { createEmployee } = useEmployees()

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      gender: '',
      street: '',
      number: '',
      zipCode: '',
      city: '',
      state: '',
      department: '',
      position: '',
      salary: 0,
      admissionDate: '',
    },
  })

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await createEmployee({ data, profilePicture: data.profilePicture })
      setPreview('')
      setActiveTab('personal')
    } catch (error) {
      console.error('Error creating employee:', error)
      toast.error('Failed to Create Employee', {
        description: 'Please check all fields and try again.',
      })
    }
  }

  // const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const result = getImageData(event)
  //   if (result) {
  //     setPreview(result.displayUrl)
  //     form.setValue('profilePicture', result.file)
  //   }
  // }

  const validateCurrentTab = () => {
    // const currentValues = form.getValues()
    let hasErrors = false

    switch (activeTab) {
      case 'personal': {
        const personalFields = [
          'name',
          'lastName',
          'email',
          'phoneNumber',
          'birthDate',
          'gender',
        ]
        personalFields.map(field => {
          return form.trigger(field as keyof EmployeeFormData)
        })
        hasErrors = personalFields.some(
          field => form.formState.errors[field as keyof EmployeeFormData]
        )
        break
      }

      case 'address': {
        const addressFields = ['street', 'number', 'zipCode', 'city', 'state']
        addressFields.map(field => {
          return form.trigger(field as keyof EmployeeFormData)
        })
        hasErrors = addressFields.some(
          field => form.formState.errors[field as keyof EmployeeFormData]
        )
        break
      }

      case 'employment': {
        const employmentFields = [
          'department',
          'position',
          'salary',
          'admissionDate',
        ]
        employmentFields.map(field => {
          return form.trigger(field as keyof EmployeeFormData)
        })
        hasErrors = employmentFields.some(
          field => form.formState.errors[field as keyof EmployeeFormData]
        )
        break
      }
      default:
        return null
    }

    if (hasErrors) {
      toast.error('Please Fix Form Errors', {
        description: 'Some fields in this section have validation errors.',
      })
      return false
    }
    return true
  }

  const goToNextTab = () => {
    if (!validateCurrentTab()) return

    const tabs = ['personal', 'address', 'employment', 'additional']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const goToPreviousTab = () => {
    const tabs = ['personal', 'address', 'employment', 'additional']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="flex items-center gap-2" value="personal">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="address">
              <MapPin className="h-4 w-4" />
              Address
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="employment">
              <Briefcase className="h-4 w-4" />
              Employment
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent className="space-y-6" value="personal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="name"
                  placeholder="Enter first name"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="lastName"
                  placeholder="Enter last name"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="email"
                  placeholder="Enter email address"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="phoneNumber"
                  placeholder="Enter phoneNumber number"
                />

                <CustomFormField
                  dateFormat="MM/dd/yyyy"
                  fieldType={FormFieldType.DATE_PICKER}
                  form={form}
                  name="birthDate"
                  placeholder="Select date of birth"
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  name="gender"
                  options={genderOptions}
                  placeholder="Select gender"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar
                    className={`h-48 w-48 bg-muted   ${
                      isRoundPhoto ? 'rounded-full' : 'rounded-lg'
                    }`}
                  >
                    <AvatarImage
                      className="h-full w-full object-cover"
                      src={preview || '/placeholder.svg?height=192&width=192'}
                    />
                    <AvatarFallback>
                      <RxAvatar className="h-48 w-48" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full space-y-2">
                    <CustomFormField
                      fieldType={FormFieldType.FILE_UPLOAD}
                      form={form}
                      name="profilePicture"
                      placeholder="Upload profile picture"
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
              </div>
            </div>
          </TabsContent>

          <TabsContent className="space-y-6" value="address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      form={form}
                      name="street"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="w-32">
                    {noStreetNumber ? (
                      <div className="flex h-11 items-center gap-2 rounded-md border px-4 bg-muted mt-2">
                        <span className="text-muted-foreground text-sm">
                          No number
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          form={form}
                          name="number"
                          placeholder="Number"
                          type="string"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        checked={noStreetNumber}
                        id="noNumber"
                        onCheckedChange={checked => {
                          setNoStreetNumber(!!checked)
                          form.setValue('number', checked ? 'No number' : '')
                        }}
                      />
                      <Label className="text-sm" htmlFor="noNumber">
                        No number
                      </Label>
                    </div>
                  </div>
                </div>

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="zipCode"
                  placeholder="Enter ZIP code"
                />
              </div>

              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="city"
                  placeholder="Enter city"
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  name="state"
                  options={brazilianStates}
                  placeholder="Select state"
                />
              </div>
            </div>
          </TabsContent>

          {/* Employment Information Tab */}
          <TabsContent className="space-y-6" value="employment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  name="department"
                  options={departmentOptions}
                  placeholder="Select department"
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  name="position"
                  options={positionOptions}
                  placeholder="Select position"
                />
              </div>

              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  name="salary"
                  placeholder="Enter annual salary"
                  type="number"
                />

                <CustomFormField
                  dateFormat="MM/dd/yyyy"
                  fieldType={FormFieldType.DATE_PICKER}
                  form={form}
                  name="admissionDate"
                  placeholder="Select start date"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            disabled={activeTab === 'personal'}
            onClick={goToPreviousTab}
            type="button"
            variant="outline"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {activeTab !== 'additional' ? (
              <Button onClick={goToNextTab} type="button">
                Next
              </Button>
            ) : (
              <CustomSubmitButton className="min-w-[120px]" form={form}>
                Create Employee
              </CustomSubmitButton>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
