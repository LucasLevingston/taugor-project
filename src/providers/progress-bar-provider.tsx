import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { UseFormReturn } from 'react-hook-form'

interface FormProgressContextType {
  progress: number
  trackForm: (formInstance: UseFormReturn<any>, fields?: string[]) => () => void
}

const FormProgressContext = createContext<FormProgressContextType | undefined>(
  undefined
)

interface FormProgressProviderProps {
  children: React.ReactNode
}

export function FormProgressProvider({ children }: FormProgressProviderProps) {
  const [progress, setProgress] = useState(0)
  const [trackedForm, setTrackedForm] = useState<{
    form: UseFormReturn<any>
    fields: string[]
  } | null>(null)

  const trackForm = useCallback(
    (formInstance: UseFormReturn<any>, fields?: string[]) => {
      setTrackedForm({ form: formInstance, fields: fields || [] })
      return () => setTrackedForm(null)
    },
    []
  )

  useEffect(() => {
    if (!trackedForm) {
      setProgress(0)
      return
    }

    const { form: currentForm, fields: currentFields } = trackedForm

    const calculateProgress = () => {
      const values = currentForm.getValues()
      let totalFields = 0
      let filledFields = 0

      const fields =
        currentFields.length > 0 ? currentFields : Object.keys(values)

      fields.map(key => {
        if (key === 'profilePicture' && !(values[key] instanceof File)) {
          return null
        }

        totalFields++
        const value = values[key]

        if (typeof value === 'string' && value.trim() !== '') {
          filledFields++
        } else if (
          typeof value === 'number' &&
          value !== null &&
          value !== undefined
        ) {
          filledFields++
        } else if (
          typeof value === 'boolean' &&
          value !== null &&
          value !== undefined
        ) {
          filledFields++
        } else if (value instanceof File) {
          filledFields++
        } else if (Array.isArray(value) && value.length > 0) {
          filledFields++
        } else if (
          typeof value === 'object' &&
          value !== null &&
          Object.keys(value).length > 0
        ) {
          filledFields++
        }

        return null
      })

      if (totalFields === 0) {
        setProgress(0)
      } else {
        setProgress(Math.round((filledFields / totalFields) * 100))
      }
    }

    calculateProgress()

    const subscription = currentForm.watch(() => {
      calculateProgress()
    })

    return () => subscription.unsubscribe()
  }, [trackedForm])

  const contextValue = useMemo(
    () => ({ progress, trackForm }),
    [progress, trackForm]
  )

  return (
    <FormProgressContext.Provider value={contextValue}>
      {children}
    </FormProgressContext.Provider>
  )
}

export function useFormProgress() {
  const context = useContext(FormProgressContext)
  if (context === undefined) {
    throw new Error(
      'useFormProgress must be used within a FormProgressProvider'
    )
  }
  return context
}

export function useFormProgressTracker(
  form: UseFormReturn<any>,
  fieldsToTrack?: string[]
) {
  const { trackForm } = useFormProgress()

  useEffect(() => {
    const cleanup = trackForm(form, fieldsToTrack)
    return cleanup
  }, [form, fieldsToTrack, trackForm])
}
