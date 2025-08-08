import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, MapPin, User, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useFormProgressTracker } from '@/providers/progress-bar-provider'
import { createEmployeeSchema } from '@/schemas/create-employee-schema'
import { EmployeeType } from '@/types/employee-type'
import { CustomSubmitButton } from '../form-components/custom-submit-button'
import { EditButton } from '../form-components/edit-button'

type EmployeeFormData = z.infer<typeof createEmployeeSchema>

// function getImageData(event: ChangeEvent<HTMLInputElement>) {
//   if (!event.target.files?.[0]) return null

//   const file = event.target.files[0]
//   const displayUrl = URL.createObjectURL(file)
//   return { file, displayUrl }
// }
interface EmployeeFormProps {
  employee?: EmployeeType
}
export function EmployeeForm({ employee }: EmployeeFormProps) {
  const [preview, setPreview] = useState(employee?.profilePictureUrl || '')
  const [isRoundPhoto, setIsRoundPhoto] = useState(false)
  const [noStreetNumber, setNoStreetNumber] = useState(
    employee?.number === 'No number'
  )
  const [isEditing, setIsEditing] = useState(!employee)
  const [activeTab, setActiveTab] = useState('personal')

  const { createEmployee, updateEmployee } = useEmployees()

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: employee?.name || '',
      email: employee?.email || '',
      phone: employee?.phone || '',
      birthDate: employee?.birthDate || '',
      gender: employee?.gender || '',
      street: employee?.street || '',
      number: employee?.number || '',
      zipCode: employee?.zipCode || '',
      city: employee?.city || '',
      state: employee?.state || '',
      department: employee?.department || '',
      position: employee?.position || '',
      salary: employee?.salary || 0,
      admissionDate: employee?.admissionDate || '',
      profilePicture: null,
    },
  })
  useFormProgressTracker(form)

  useEffect(() => {
    if (employee) {
      form.reset({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        birthDate: employee.birthDate,
        gender: employee.gender,
        street: employee.street,
        number: employee.number,
        zipCode: employee.zipCode,
        city: employee.city,
        state: employee.state,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        admissionDate: employee.admissionDate,
        profilePicture: null, // Reset file input
      })
      setPreview(employee.profilePictureUrl || '')
      setNoStreetNumber(employee.number === 'No number')
    } else {
      form.reset({
        name: '',
        email: '',
        phone: '',
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
        profilePicture: null,
      })
      setPreview('')
      setNoStreetNumber(false)
    }
  }, [employee, form])

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (employee?.uid) {
        await updateEmployee(employee.uid, data, data.profilePicture)
        toast.success('Employee updated successfully!')
      } else {
        await createEmployee({ data, profilePicture: data.profilePicture })
        toast.success('Employee created successfully!')
        // Reset form after successful creation
        form.reset()
        setPreview('')
        setActiveTab('personal')
      }
    } catch (error) {
      console.error('Error submitting employee form:', error)
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
                  isEditing={isEditing}
                  name="name" // Changed to full name as lastName was removed
                  placeholder="Enter full name"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="email"
                  placeholder="Enter email address"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="phone"
                  placeholder="Enter phone number"
                />
                <CustomFormField
                  dateFormat="MM/dd/yyyy"
                  fieldType={FormFieldType.DATE_PICKER}
                  form={form}
                  isEditing={isEditing}
                  name="birthDate"
                  placeholder="Select date of birth"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
                  name="gender"
                  options={genderOptions}
                  placeholder="Select gender"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar
                    className={`h-48 w-48 bg-muted ${
                      isRoundPhoto ? 'rounded-full' : 'rounded-lg'
                    }`}
                  >
                    <AvatarImage
                      className="h-full w-full object-cover"
                      src={preview || '/placeholder.svg?height=192&width=192'}
                    />
                    <AvatarFallback>
                      <UserRound className="h-48 w-48" /> {/* Lucide icon */}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full space-y-2">
                    <CustomFormField
                      fieldType={FormFieldType.FILE_UPLOAD}
                      form={form}
                      isEditing={isEditing}
                      label=""
                      name="profilePicture"
                      placeholder="Upload profile picture" // No label for file upload
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isRoundPhoto}
                      onCheckedChange={setIsRoundPhoto} // Disable switch if not editing
                    />
                    <Label>Round photo</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Address Information Tab */}
          <TabsContent className="space-y-6" value="address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      form={form}
                      isEditing={isEditing}
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
                          isEditing={isEditing}
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
                        }} // Disable checkbox if not editing
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
                  isEditing={isEditing}
                  name="zipCode"
                  placeholder="Enter ZIP code"
                />
              </div>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="city"
                  placeholder="Enter city"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
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
                  isEditing={isEditing}
                  name="department"
                  options={departmentOptions}
                  placeholder="Select department"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
                  name="position"
                  options={positionOptions}
                  placeholder="Select position"
                />
              </div>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="salary"
                  placeholder="Enter annual salary"
                  type="number"
                />
                <CustomFormField
                  dateFormat="MM/dd/yyyy"
                  fieldType={FormFieldType.DATE_PICKER}
                  form={form}
                  isEditing={isEditing}
                  name="admissionDate"
                  placeholder="Select start date"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          {employee ? (
            <EditButton
              form={form}
              isEditing={isEditing}
              isSubmitting={form.formState.isSubmitting}
              onSubmit={onSubmit}
              setIsEditing={setIsEditing}
            />
          ) : (
            <CustomSubmitButton form={form}>Create</CustomSubmitButton>
          )}
        </div>
      </form>
    </Form>
  )
}
