import { Users } from 'lucide-react'
import { JSX, useEffect } from 'react'
import { Columns } from '@/components/custom/employee-table-columns'
import { EmployeeTable } from '@/components/employees-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEmployees } from '@/hooks/use-employee'
export function EmployeesList(): JSX.Element {
  const { employees, deactivateEmployeeById, getEmployees } = useEmployees()

  useEffect(() => {
    const fetch = async () => {
      await getEmployees()
    }
    fetch()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Employees List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Progress className="w-[60%]" value={progress} /> */}
          {employees && (
            <EmployeeTable
              columns={Columns}
              data={employees}
              deactivateEmployeeById={deactivateEmployeeById}
            />
          )}{' '}
        </CardContent>
      </Card>
    </div>
  )
}
