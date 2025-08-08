import { Outlet } from 'react-router-dom'
import { Header } from '@/components/custom/header'
import { FormProgressProvider } from '@/providers/progress-bar-provider'

export function RootLayout() {
  return (
    <FormProgressProvider>
      <div className="flex min-h-screen flex-col">
        <header>
          <Header />
        </header>
        <div className="flex-1 overflow-auto py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </FormProgressProvider>
  )
}
