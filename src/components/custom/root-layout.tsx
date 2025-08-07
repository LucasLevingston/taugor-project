import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function RootLayout() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
            <Header />
          </header>
          <main className="flex-1 overflow-auto py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
