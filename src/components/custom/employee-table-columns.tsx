import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Badge } from '../ui/badge'

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
            <RxAvatar className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: 'name',
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
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')
      return (
        <Badge
          className={`${isActive ? 'bg-green-500' : 'bg-destructive'} dark:text-black`}
        >
          {isActive ? 'Active' : 'Deactivated'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'salary',
    header: () => <div className="text-right">Salary</div>,
    cell: ({ row }) => {
      const salario = Number.parseFloat(row.getValue('salary'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BRL',
      }).format(salario)
      return <div className="text-right font-medium">{formatted}</div>
    },
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
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link className="cursor-pointer" to={`/employee/${employee.uid}`}>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex font-bold text-red-600"
              onClick={async () => {
                if (
                  employee.uid &&
                  (await deactivateEmployeeById(employee.uid))
                ) {
                  toast.error('Employee deactivated')
                  setTimeout(() => {
                    window.location.reload()
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
