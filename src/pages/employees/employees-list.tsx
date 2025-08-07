import { JSX } from 'react'
import { Columns } from '@/components/custom/employee-table-columns'
import { EmployeeTable } from '@/components/employees-table'
import { useEmployees } from '@/hooks/use-employee'

export function EmployeesList(): JSX.Element {
  const { employees, deactivateEmployeeById } = useEmployees()

  // useEffect(() => {
  //   const fetch = async () => {
  //     await getEmployees()
  //   }
  //   fetch()
  // }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-bold mb-6">Employee List</h1>
      {employees && (
        <EmployeeTable
          columns={Columns}
          data={employees}
          deactivateEmployeeById={deactivateEmployeeById}
        />
      )}
    </div>
  )
}
