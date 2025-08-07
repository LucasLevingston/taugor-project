import { ReloadIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaUserPlus } from 'react-icons/fa6'
import { GoColumns } from 'react-icons/go'
import { RxAvatar } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { desativarEmployee, EmployeeType } from '@/hooks/funcionarios.hooks'

// ...imports (mantidos iguais)
export const Columns: ColumnDef<EmployeeType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fotoPerfilUrl',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue('fotoPerfilUrl')} />
          <AvatarFallback>
            <RxAvatar className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'cargo',
    header: 'Position',
  },
  {
    accessorKey: 'setor',
    header: 'Department',
  },
  {
    accessorKey: 'salario',
    header: () => <div className="text-right">Salary</div>,
    cell: ({ row }) => {
      const salario = Number.parseFloat(row.getValue('salario'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // or 'BRL' if you prefer
      }).format(salario)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/get-funcionario/${employee.id}`}>View details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex font-bold text-red-600"
              onClick={async () => {
                if (employee.id && (await desativarEmployee(employee.id))) {
                  toast.error('Employee deactivated')
                  setTimeout(() => {
                    window.location.href = '/'
                  }, 2000)
                }
              }}
            >
              Deactivate employee
              <FaTrash className="ml-3" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface EmployeeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function EmployeeTable<TData, TValue>({
  columns,
  data,
}: EmployeeTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data) setLoading(false)
  }, [data])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="flex justify-center">
      <Toaster position="top-right" richColors />
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-5">
          <div>Loading...</div>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between py-4">
            <Input
              className="max-w-sm"
              onChange={event =>
                table.getColumn('nome')?.setFilterValue(event.target.value)
              }
              placeholder="Filter by name"
              value={
                (table.getColumn('nome')?.getFilterValue() as string) ?? ''
              }
            />
            <Button variant="outline">
              <Link className="flex items-center" to="/cadastro-funcionario">
                Add Employee
                <FaUserPlus className="ml-2" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns
                  <GoColumns className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black text-white">
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <div key={column.id}>
                        {column.id === 'fotoPerfilUrl' ? null : (
                          <DropdownMenuCheckboxItem
                            checked={column.getIsVisible()}
                            className="capitalize"
                            onCheckedChange={value =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )}
                      </div>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} employee(s)
            selected.
          </div>
          <div className="rounded-md border border-mainColor">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      key={row.id}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center"
                      colSpan={columns.length}
                    >
                      No employees registered.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="sm"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
