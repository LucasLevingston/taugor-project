import { useMask } from '@react-input/mask'
import { format } from 'date-fns'
import { CalendarIcon, Search, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { IoEyeOutline, IoEyeSharp } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  cpfOptions,
  phoneOptions,
  zipCodeOptions,
} from '@/lib/react-input-mask-options'
import { getAddressByZipCode } from '@/lib/utils/get-address-by-zip-code'
import { getIconByFormName } from '@/lib/utils/get-icon-by-form-name'
import { getLabelByFormName } from '@/lib/utils/get-label-by-form-name'
import { getLabelForEnum } from '@/lib/utils/get-label-for-enum'
import { getPlaceholderByFormName } from '@/lib/utils/get-placeholder-by-form-name'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  FILE_UPLOAD = 'fileUpload',
}

interface CustomProps {
  form: UseFormReturn<any, any, any>
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType: FormFieldType
  isEditing?: boolean
  options?: Record<string, string>
  type?: 'number' | 'string'
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [isVisible, setIsVisible] = useState(
    !(props.name === 'password' || props.name === 'confirmPassword')
  )
  const phoneRef = useMask(phoneOptions)
  const zipCodeRef = useMask(zipCodeOptions)
  const cpfRef = useMask(cpfOptions)

  function getInputRef(name: string) {
    if (name === 'phone') return phoneRef
    if (name === 'zipCode') return zipCodeRef
    if (name === 'cpf') return cpfRef

    return field.ref
  }
  const getInputType = () => {
    if (props.name === 'password' || props.name === 'confirmPassword') {
      return isVisible ? 'text' : 'password'
    }

    if (props.type) {
      return props.type
    }

    switch (props.name) {
      case 'email':
        return 'email'
      case 'phone':
        return 'tel'
      case 'age':
      case 'quantity':
        return 'number'
      default:
        return 'text'
    }
  }

  switch (props.fieldType) {
    case FormFieldType.INPUT: {
      return (
        <div
          className={`flex items-center gap-2 rounded-md border  ${props.name === 'password' || props.name === 'confirmPassword' ? 'px-4' : 'pl-4'}`}
        >
          {getIconByFormName(props.name)}
          <FormControl>
            <Input
              placeholder={getPlaceholderByFormName(props.name)}
              type={getInputType()}
              {...field}
              autoComplete={
                props.name === 'password' || props.name === 'confirmPassword'
                  ? 'current-password'
                  : 'on'
              }
              className="no-spinners h-11 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
              disabled={!props.isEditing}
              ref={getInputRef(props.name)}
              variant="outline"
            />
          </FormControl>
          {(props.name === 'password' || props.name === 'confirmPassword') && (
            <button
              className="cursor-pointer pl-3"
              onClick={() => setIsVisible(!isVisible)}
              type="button"
            >
              {isVisible ? (
                <IoEyeOutline className="h-7 w-7" />
              ) : (
                <IoEyeSharp className="h-7 w-7" />
              )}
            </button>
          )}
          {props.name === 'zipCode' && (
            <Button
              onClick={() => getAddressByZipCode(props.form)}
              type="button"
              variant="outline"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                className="flex h-11 items-center justify-start gap-2 rounded-md border px-4"
                disabled={!props.isEditing}
                type="button"
                variant="ghost"
              >
                <CalendarIcon />
                {field.value
                  ? format(field.value, props.dateFormat ?? 'PPP')
                  : getPlaceholderByFormName(props.name)}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <Calendar
              disabled={date =>
                date > new Date() || date < new Date('1900-01-01')
              }
              mode="single"
              onSelect={field.onChange}
              selected={field.value}
            />
          </PopoverContent>
        </Popover>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl className="flex items-center gap-2 rounded-md border px-4">
          <Textarea
            className="h-11 border focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
            placeholder={getPlaceholderByFormName(props.name)}
            {...field}
            disabled={!props.isEditing}
          />
        </FormControl>
      )

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={field.value}
              className="border-white"
              id={props.name}
              onCheckedChange={field.onChange}
            />
            <label
              className="cursor-pointer font-medium text-dark-700 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
              htmlFor={props.name}
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      )
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              {props.isEditing ? (
                <SelectTrigger
                  className="h-11 w-full border-dark-500 focus:ring-0 focus:ring-offset-0 dark:bg-dark-400"
                  disabled={!props.isEditing}
                >
                  <div className="flex items-center gap-2">
                    {getIconByFormName(props.name)}
                    <SelectValue
                      placeholder={
                        getPlaceholderByFormName(props.name) ||
                        props.placeholder
                      }
                    />
                  </div>
                </SelectTrigger>
              ) : (
                <Label className="h-11 rounded-md border p-4 font-normal focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent">
                  {getIconByFormName(props.name)}
                  {getLabelForEnum(props.form.getValues(props.name)) ||
                    props.placeholder}
                </Label>
              )}
            </FormControl>
            <SelectContent className="border-dark-500 dark:bg-dark-400">
              {props.options
                ? Object.values(props.options).map(optionValue => (
                    <SelectItem key={optionValue} value={optionValue}>
                      {getLabelForEnum(optionValue)}
                    </SelectItem>
                  ))
                : props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.FILE_UPLOAD:
      return (
        <div className="flex items-center gap-2 rounded-md border px-4">
          <Upload className="h-5 w-5" />
          <FormControl>
            <Input
              className="h-11 border-0 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:font-semibold file:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent "
              disabled={!props.isEditing}
              onChange={e => {
                const file = e.target.files?.[0]
                field.onChange(file)
              }}
              type="file"
            />
          </FormControl>
          {field.value && field.value instanceof File && (
            <span className="truncate text-muted-foreground text-sm">
              {field.value.name}
            </span>
          )}
        </div>
      )
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps) => {
  const { form, name, label, isEditing = true } = props
  const finalLabel = label === '' ? '' : label || getLabelByFormName(name)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && finalLabel && (
            <FormLabel className="font-semibold text-[14px]">
              {finalLabel}
            </FormLabel>
          )}
          <RenderInput field={field} props={{ ...props, isEditing }} />

          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
