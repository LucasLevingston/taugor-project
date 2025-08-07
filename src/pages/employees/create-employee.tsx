import { User } from 'lucide-react'
import Formulario from '@/components/create-employee-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CreateEmployee() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
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
          {/* <Progress className="w-[60%]" value={progress} /> */}
          <Formulario />
        </CardContent>
      </Card>
    </div>
  )
}
