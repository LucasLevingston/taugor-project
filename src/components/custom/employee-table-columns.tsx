import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Trash2, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EmployeeType } from '@/types/employee-type'

export const Columns: ColumnDef<EmployeeType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Selecionar todos"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Selecionar linha"
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'profilePictureUrl',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            alt={`${row.original.name}'s profile picture`}
            src={
              row.getValue('profilePictureUrl') ||
              '/placeholder.svg?height=40&width=40&query=avatar'
            }
          />
          <AvatarFallback>
            <User className="h-full w-full" />{' '}
            {/* Ícone User do lucide-react */}
          </AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false, // Imagens geralmente não são ordenáveis
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Telefone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Departamento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Cargo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Salário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const salario = Number.parseFloat(row.getValue('salary'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(salario)
      return <div className="text-right font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'admissionDate',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Data de Admissão
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('admissionDate'))
      return date.toLocaleDateString('pt-BR')
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')
      return (
        <Badge
          className={`${isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {isActive ? 'Ativo' : 'Desativado'}
        </Badge>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const employee = row.original
      const { deactivateEmployeeById } = table.options.meta as {
        deactivateEmployeeById: (uid: string) => Promise<boolean>
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link className="cursor-pointer" to={`/employee/${employee.uid}`}>
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer bg-destructive hover:bg-destructive hover:opacity-80 hover:text-black"
              onClick={async () => {
                if (
                  employee.uid &&
                  (await deactivateEmployeeById(employee.uid))
                ) {
                  toast.error('Funcionário desativado')
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                }
              }}
            >
              Desativar funcionário
              <Trash2 className="ml-3 h-4 w-4" />{' '}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
