import { User } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { EmployeeForm } from '@/components/custom/forms/employee-form'
import { PDFButton } from '@/components/custom/PDF/pdf-button'
import HistoricButton from '@/components/historic-button'
import { PromoteButton } from '@/components/promote-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEmployees } from '@/hooks/use-employee'

export default function EmployeeDetails() {
  const { getEmployeeById } = useEmployees()
  const { id } = useParams<{ id: string }>()
  if (!id) {
    throw new Error('Error')
  }
  const employee = getEmployeeById(id)

  if (!employee) {
    throw new Error('Error')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              Employee: {employee.name}
            </div>
            <div className="flex gap-2 items-center">
              <PromoteButton employee={employee} />
              <PDFButton employee={employee} />
              <HistoricButton employee={employee} />
            </div>
          </CardTitle>
          <CardDescription>Data of employee.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Progress className="w-[60%]" value={progress} /> */}
          <EmployeeForm employee={employee} />
        </CardContent>
      </Card>
    </div>
  )
}
