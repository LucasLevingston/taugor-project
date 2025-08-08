import type React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CustomSubmitButtonProps {
  isSubmitting?: boolean
  isDirty?: boolean
  children: React.ReactNode
  submittingText?: string
  className?: string
  disabled?: boolean
  form?: UseFormReturn<any, any, any>
}

export function CustomSubmitButton({
  isSubmitting,
  isDirty = true,
  children,
  submittingText = 'Enviando...',
  className,
  disabled,
  form,
}: CustomSubmitButtonProps) {
  return (
    <Button
      className={cn(className, '')}
      disabled={isSubmitting || !isDirty || disabled}
      type="submit"
    >
      {form?.formState.isSubmitting || isSubmitting ? (
        <>
          <Loading />
          {submittingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
