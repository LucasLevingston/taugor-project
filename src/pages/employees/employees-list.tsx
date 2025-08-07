import { JSX } from 'react'
import { Columns, EmployeeTable } from '@/components/employees-table'
import { EmployeeType, getEmployees } from '@/hooks/funcionarios.hooks'

export function EmployeesList(): JSX.Element {
  const funcionarios: EmployeeType[] = getEmployees()

  return (
    <div className="min-w-4xl">
      <EmployeeTable columns={Columns} data={funcionarios} />
    </div>
  )
}
