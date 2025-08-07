import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEmployees } from '@/hooks/use-employee'
import { EmployeePosition, EmployeeType } from '@/types/employee-type' // Import EmployeePosition enum

interface PromoteButtonProps {
  employee: EmployeeType
  // You might want to pass the new position or let the user select it in a dialog
  // For simplicity, we'll hardcode a common promotion for now.
  // A more advanced version would open a dialog to select the new position.
}

export const PromoteButton: React.FC<PromoteButtonProps> = ({ employee }) => {
  const { promoteEmployee } = useEmployees()

  // Determine a logical next position for promotion.
  // This is a simplified example; in a real app, you'd have a more robust logic
  // or a UI to select the new position.
  const getNextPosition = (
    currentPosition: string
  ): EmployeePosition | string => {
    switch (currentPosition) {
      case EmployeePosition.JUNIOR_DEVELOPER:
        return EmployeePosition.MID_LEVEL_DEVELOPER
      case EmployeePosition.MID_LEVEL_DEVELOPER:
        return EmployeePosition.SENIOR_DEVELOPER
      case EmployeePosition.SENIOR_DEVELOPER:
        return EmployeePosition.TEAM_LEAD
      case EmployeePosition.TEAM_LEAD:
        return EmployeePosition.MANAGER
      default:
        return EmployeePosition.OTHER // Or a specific "promoted" status
    }
  }

  const newPosition = getNextPosition(employee.position)

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="rounded-md border-[1px] bg-green-400 p-2 text-sm font-bold text-white hover:bg-green-500">
          Promote Employee
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promote Employee?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will promote {employee.name} to {newPosition}. Are you
              sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="border bg-green-400 text-white hover:bg-green-500"
              onClick={() => {
                promoteEmployee(employee.uid!, newPosition) // Pass employee ID and new position
              }}
            >
              Promote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
