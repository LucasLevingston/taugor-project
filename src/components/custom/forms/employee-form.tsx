import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, MapPin, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import CustomFormField, {
  FormFieldType,
} from '@/components/custom/form-components/custom-form-field'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
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

interface EmployeeFormProps {
  employee?: EmployeeType
}
export function EmployeeForm({ employee }: EmployeeFormProps) {
  const [preview, setPreview] = useState(employee?.profilePictureUrl || '')
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
      birthDate: employee?.birthDate || new Date(),
      gender: employee?.gender || '',
      street: employee?.street || '',
      number: employee?.number || '',
      zipCode: employee?.zipCode || '',
      city: employee?.city || '',
      state: employee?.state || '',
      department: employee?.department || '',
      position: employee?.position || '',
      salary: employee?.salary || '0',
      admissionDate: employee?.admissionDate || new Date(),
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
        profilePicture: null,
      })
      setPreview(employee.profilePictureUrl || '')
      setNoStreetNumber(employee.number === 'No number')
    } else {
      form.reset({
        name: '',
        email: '',
        phone: '',
        birthDate: new Date(),
        gender: '',
        street: '',
        number: '',
        zipCode: '',
        city: '',
        state: '',
        department: '',
        position: '',
        salary: '0',
        admissionDate: new Date(),
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

          <TabsContent className="space-y-6" value="personal">
            {/* Estrutura de grid responsiva */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna para campos de texto */}
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="name"
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
              {/* Coluna para upload de foto de perfil e opção de arredondamento */}
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full space-y-2">
                    <CustomFormField
                      fieldType={FormFieldType.FILE_UPLOAD}
                      form={form}
                      isAvatar={true}
                      isEditing={isEditing}
                      label=""
                      name="profilePicture"
                      placeholder="Upload profile picture"
                      // isRoundPhoto e setPreview não são mais passados aqui
                      preview={preview} // Continua passando preview para inicialização
                      setPreview={setPreview} // Continua passando setPreview para atualizar o pai
                    />
                  </div>
                  {/* O Switch e Label para Round photo foram movidos para dentro do CustomFormField */}
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
                      isEditing={isEditing}
                      name="street"
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
                  isEditing={isEditing}
                  name="zipCode"
                />
              </div>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="city"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
                  name="state"
                  options={brazilianStates}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent className="space-y-6" value="employment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
                  name="department"
                  options={departmentOptions}
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  form={form}
                  isEditing={isEditing}
                  name="position"
                  options={positionOptions}
                />
              </div>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  form={form}
                  isEditing={isEditing}
                  name="salary"
                />
                <CustomFormField
                  dateFormat="dd/MM/yyyy"
                  fieldType={FormFieldType.DATE_PICKER}
                  form={form}
                  isEditing={isEditing}
                  name="admissionDate"
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
