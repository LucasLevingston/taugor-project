import type { JSX } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './components/custom/root-layout'
import { useUser } from './hooks/use-user'
import { LoginPage } from './pages/auth/login'
import { PasswordRecovery } from './pages/auth/password-recovery'
import { Register } from './pages/auth/register'
import { ResetPassword } from './pages/auth/reset-password'
import { CreateEmployee } from './pages/employees/create-employee'
import { EmployeesList } from './pages/employees/employees-list'
import { Home } from './pages/home'
import NotFound from './pages/not-found'

interface PrivateRouteProps {
  element: JSX.Element
  requiredRole?: 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER'
  requiredPermission?: string
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/login" />
  }

  return element
}

interface AuthRouteProps {
  element: JSX.Element
}
const AuthRoute = ({ element }: AuthRouteProps) => {
  const { user } = useUser()

  if (user) {
    return <Navigate to="/" />
  }
  return element
}

const authRoutes = [
  { path: '/login', element: <AuthRoute element={<LoginPage />} /> },
  { path: '/register', element: <Register /> },
  { path: '/password-recovery', element: <PasswordRecovery /> },
  { path: '/reset-password', element: <ResetPassword /> },
]
const GeneralRoutes = [
  { path: '/', element: <Home /> },
  { path: '*', element: <NotFound /> },
]

// const SettingsRoutes = [
//   {
//     element: <SettingsLayout />,
//     path: '/profile/',
//     children: [
//       // {
//       //   path: 'google-connect',
//       //   element: <PrivateRoute element={<ConnectGooglePage />} />,
//       // },
//       { path: 'theme', element: <PrivateRoute element={<ThemeSettings />} /> },
//       {
//         path: '',
//         element: <PrivateRoute element={<ProfileSettings />} />,
//       },
//     ],
//   },
// ]

const protectedRoutes = [
  {
    path: '/employee/list',
    element: <PrivateRoute element={<EmployeesList />} />,
  },
  {
    path: '/employee/create',
    element: <PrivateRoute element={<CreateEmployee />} />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...GeneralRoutes,
      ...authRoutes,
      // ...SettingsRoutes,
      ...protectedRoutes,
    ],
  },
])
