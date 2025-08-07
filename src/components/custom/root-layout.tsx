import { Outlet } from 'react-router-dom'
import Header from './Header'

export function RootLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-gray-200 border-b dark:border-[#1F1F23]">
          <Header />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
