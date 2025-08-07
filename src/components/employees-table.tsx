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
import React from 'react'
import { FaUserPlus } from 'react-icons/fa6'
import { GoColumns } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

interface EmployeeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  deactivateEmployeeById: (uid: string) => Promise<boolean>
}

export function EmployeeTable<TData, TValue>({
  columns,
  data,
  deactivateEmployeeById,
}: EmployeeTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    meta: {
      deactivateEmployeeById,
    },
  })

  return (
    <div className="w-full">
      <Toaster position="top-right" richColors />

      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
          <Input
            className="max-w-sm"
            onChange={event =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            placeholder="Filter by name"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          />
          <div className="flex gap-2">
            <Button asChild variant="outline">
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
                  .filter(
                    column =>
                      column.getCanHide() && column.id !== 'profilePictureUrl'
                  ) // Filtra profilePictureUrl aqui
                  .map(column => (
                    <DropdownMenuCheckboxItem // Removido o div extra aqui
                      checked={column.getIsVisible()}
                      className="capitalize"
                      key={column.id}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="text-muted-foreground flex-1 text-sm mb-4">
          {table.getFilteredSelectedRowModel().rows.length} employee(s)
          selected.
        </div>
        <div className="rounded-md border border-mainColor overflow-x-auto">
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
    </div>
  )
}
