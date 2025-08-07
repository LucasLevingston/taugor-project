import ProgressBar from '@ramonak/react-progress-bar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase'
import { RHControlIcon } from '../icons/rh-control-icon'
import { HeaderDropdown } from './header-dropdown'
import { ThemeToggle } from './theme-toggle'

export function Header({ progress }: { progress?: number }) {
  const [progressBar] = useState(0)
  const user = auth.currentUser

  return (
    <div className="h-full items-center justify-between border-gray-200 border-b px-3 sm:px-6 dark:border-[#1F1F23]">
      <div className="m-2 flex justify-start">
        <div className="flex h-full w-full items-center">
          <Link
            className="flex h-full items-center border-r-[1px] border-r-gray-300 dark:border-r-gray-600 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            to="/"
          >
            <RHControlIcon className="mr-3" size={28} />
            <p className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              RHControl
            </p>
          </Link>
          <div className="text-left h-full pl-5 flex items-center">
            {progressBar > 0 ? (
              <h1 className="text-[18px] font-bold">Informações de contato</h1>
            ) : (
              <div className="text-[13px] font-bold text-muted-foreground">
                Seja bem-vindo!
              </div>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4">
          <ThemeToggle />
          {user ? (
            <HeaderDropdown user={user} />
          ) : (
            <div className="flex cursor-pointer items-center space-x-2">
              <Button asChild variant="ghost">
                <Link to="/login">Logar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Fazer Registro</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-3 w-full rounded-none">
        <ProgressBar
          animateOnRender={true}
          ariaValuetext={0}
          bgColor="#0073CF"
          className="h-1 w-full"
          completed={progress ?? progressBar}
          customLabel={`${progress ?? progressBar}%`}
          height={'15px'}
        />
      </div>
    </div>
  )
}
