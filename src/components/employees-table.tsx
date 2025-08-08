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
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmployeeType } from '@/types/employee-type'

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
  const [globalFilter, setGlobalFilter] = React.useState('')

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
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    meta: {
      deactivateEmployeeById,
    },
  })

  const uniqueDepartments = React.useMemo(() => {
    const departments = new Set<string>()
    data.map(item => departments.add((item as EmployeeType).department))
    return Array.from(departments).sort()
  }, [data])

  const uniquePositions = React.useMemo(() => {
    const positions = new Set<string>()
    data.map(item => positions.add((item as EmployeeType).position))
    return Array.from(positions).sort()
  }, [data])

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
        <div className="flex flex-wrap gap-4">
          <Input
            className="max-w-sm"
            onChange={event => setGlobalFilter(event.target.value)}
            placeholder="Buscar em todas as colunas..."
            value={globalFilter ?? ''}
          />

          <Select
            onValueChange={value =>
              table
                .getColumn('department')
                ?.setFilterValue(value === 'all' ? undefined : value)
            }
            value={
              (table.getColumn('department')?.getFilterValue() as string) ?? ''
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Departamentos</SelectItem>{' '}
              {uniqueDepartments.map(department => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={value =>
              table
                .getColumn('position')
                ?.setFilterValue(value === 'all' ? undefined : value)
            }
            value={
              (table.getColumn('position')?.getFilterValue() as string) ?? ''
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Cargos</SelectItem>{' '}
              {uniquePositions.map(position => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={value =>
              table
                .getColumn('isActive')
                ?.setFilterValue(value === 'all' ? undefined : value)
            }
            value={
              (table.getColumn('isActive')?.getFilterValue() as string) ?? ''
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>{' '}
              <SelectItem value="true">Ativo</SelectItem>
              <SelectItem value="false">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link className="flex items-center" to="/employee/create">
              {' '}
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Funcionário
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto" variant="outline">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  column =>
                    column.getCanHide() && column.id !== 'profilePictureUrl'
                )
                .map(column => (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    className="capitalize"
                    key={column.id}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="text-muted-foreground flex-1 text-sm mb-4">
        {table.getFilteredSelectedRowModel().rows.length} funcionário(s)
        selecionado(s).
      </div>
      <div className="rounded-md border overflow-x-auto">
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
                  Nenhum funcionário registrado.
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
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="outline"
        >
          Próximo <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
