import { PencilIcon, SaveIcon, XIcon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'

interface EditButtonProps {
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  form: UseFormReturn<any>
  onSubmit: (values: any) => void | Promise<void>
  isSubmitting?: boolean
}

export function EditButton({
  isEditing,
  setIsEditing,
  form,
  onSubmit,
  isSubmitting = form.formState.isSubmitting,
}: EditButtonProps) {
  const handleSave = () => {
    form.handleSubmit(onSubmit)()
  }

  const handleCancel = () => {
    form.reset(form.formState.defaultValues)
    setIsEditing(false)
  }

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <>
          <Button
            disabled={isSubmitting || !form.formState.isDirty}
            onClick={handleSave}
            size="sm"
          >
            {isSubmitting ? (
              <>
                <Loading /> Salvando...
              </>
            ) : (
              <>
                <SaveIcon className="mr-2 h-4 w-4" /> Salvar
              </>
            )}
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleCancel}
            size="sm"
            variant="outline"
          >
            <XIcon className="mr-2 h-4 w-4" /> Cancelar
          </Button>
        </>
      ) : (
        <Button onClick={() => setIsEditing(true)} size="sm">
          <PencilIcon className="mr-2 h-4 w-4" /> Editar
        </Button>
      )}
    </div>
  )
}
