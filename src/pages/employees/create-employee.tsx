import { User } from 'lucide-react'
import { EmployeeForm } from '@/components/custom/forms/employee-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CreateEmployee() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Create New Employee
          </CardTitle>
          <CardDescription>
            Fill out the information below to add a new employee to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm />
        </CardContent>
      </Card>
    </div>
  )
}
