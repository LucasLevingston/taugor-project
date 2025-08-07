import {
  BarChart,
  FileText,
  LayoutList,
  LogOut,
  MoveUpRight,
  Settings,
  User,
} from 'lucide-react'
import type * as React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { UserType } from '@/types/user-type'

interface MenuItem {
  label: string
  href: string
  icon?: React.ReactNode
  external?: boolean
  show?: boolean
}

interface HeaderDropdownProps {
  user: UserType
}

export function HeaderDropdown({ user }: HeaderDropdownProps) {
  const { logout } = useAuth()

  const menuItems: MenuItem[] = [
    {
      label: 'Meus Dados',
      href: '/profile',
      icon: <User className="h-4 w-4" />,
    },
    {
      label: 'Configurações',
      href: '/settings',
      icon: <Settings className="h-4 w-4" />,
    },
    // {
    //   label: 'Gerenciar Usuários',
    //   href: '/admin/users',
    //   icon: <Users className="h-4 w-4" />,
    //   show: user?.role === UserRole.ADMIN,
    // },
    {
      label: 'Gerenciar Programas',
      href: '/programs',
      icon: <LayoutList className="h-4 w-4" />,
    },
    {
      label: 'Relatórios',
      href: '/reports',
      icon: <BarChart className="h-4 w-4" />,
    },

    {
      label: 'Termos e Políticas',
      href: '/terms',
      icon: <FileText className="h-4 w-4" />,
      external: false,
    },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative h-8 w-8 rounded-full cursor-pointer"
          variant="ghost"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={user?.displayName || 'User'}
              src={
                user?.photoURL ||
                '/placeholder.svg?height=72&width=72&query=user avatar'
              }
            />
            <AvatarFallback>
              {user?.displayName ? (
                user.displayName.charAt(0).toUpperCase()
              ) : (
                <User className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map(item =>
            item.show === undefined || item.show ? (
              <DropdownMenuItem asChild key={item.label}>
                <Link
                  target={item.external ? '_blank' : '_self'}
                  to={item.href}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.external && <MoveUpRight className="ml-auto h-4 w-4" />}
                </Link>
              </DropdownMenuItem>
            ) : null
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
