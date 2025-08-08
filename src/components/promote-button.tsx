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
import { EmployeePosition, EmployeeType } from '@/types/employee-type'
import { Button } from './ui/button'

interface PromoteButtonProps {
  employee: EmployeeType
}

export const PromoteButton: React.FC<PromoteButtonProps> = ({ employee }) => {
  const { promoteEmployee } = useEmployees()

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
        return EmployeePosition.OTHER
    }
  }

  const newPosition = getNextPosition(employee.position)

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-green-500">Promote Employee</Button>
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
                promoteEmployee(employee.uid!, newPosition)
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
