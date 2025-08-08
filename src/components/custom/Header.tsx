import ProgressBar from '@ramonak/react-progress-bar'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase'
import { useFormProgress } from '@/providers/progress-bar-provider'
import { RHControlIcon } from '../icons/rh-control-icon'
import { HeaderDropdown } from './header-dropdown'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const { progress } = useFormProgress()
  const user = auth.currentUser

  return (
    <div className="flex flex-col border-b border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between py-4 px-3 sm:px-6">
        {' '}
        <div className="flex items-center">
          {' '}
          <Link
            className="flex items-center border-r-[1px] border-r-gray-300 dark:border-r-gray-600 pr-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            to="/"
          >
            <RHControlIcon className="mr-3" size={28} />
            <p className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              RHControl
            </p>
          </Link>
          <div className="text-left pl-5 items-center sm:flex hidden">
            {progress > 0 ? (
              <h1 className="text-[18px] font-bold">Informações de contato</h1>
            ) : (
              <div className="text-[13px] font-bold text-muted-foreground">
                Seja bem-vindo!
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          {user ? (
            <HeaderDropdown user={user} />
          ) : (
            <div className="flex items-center flex-col gap-2 md:flex-row md:gap-4">
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
      {progress > 0 && (
        <div className="flex h-3 w-full rounded-none">
          <ProgressBar
            animateOnRender={true}
            ariaValuetext={progress}
            bgColor="#0073CF"
            className="h-1 w-full"
            completed={progress}
            customLabel={`${progress}%`}
            height={'15px'}
          />
        </div>
      )}
    </div>
  )
}
