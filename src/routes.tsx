import { type JSX, lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './components/custom/root-layout'
import { Loading } from './components/Loading'
import { ProfileSettings } from './pages/settings/profile'

const LoginPage = lazy(() =>
  import('./pages/auth/login').then(module => ({ default: module.LoginPage }))
)
const PasswordRecovery = lazy(() =>
  import('./pages/auth/password-recovery').then(module => ({
    default: module.PasswordRecovery,
  }))
)
const Register = lazy(() =>
  import('./pages/auth/register').then(module => ({ default: module.Register }))
)
const ResetPassword = lazy(() =>
  import('./pages/auth/reset-password').then(module => ({
    default: module.ResetPassword,
  }))
)
const CreateEmployee = lazy(() =>
  import('./pages/employees/create-employee').then(module => ({
    default: module.CreateEmployee,
  }))
)
const EmployeesList = lazy(() =>
  import('./pages/employees/employees-list').then(module => ({
    default: module.EmployeesList,
  }))
)
const Home = lazy(() => import('./pages/home'))
const NotFound = lazy(() => import('./pages/not-found'))

const EmployeeDetails = lazy(() => import('./pages/employees/employee-details'))

interface PrivateRouteProps {
  element: JSX.Element
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  // const user = auth.currentUser

  // if (!user) {
  //   return <Navigate to="/login" />
  // }
  return element
}

interface AuthRouteProps {
  element: JSX.Element
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  // const user = auth.currentUser

  // if (user) {
  //   return <Navigate to="/" />
  // }
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

const settingsRoutes = [
  {
    path: '/settings/profile',
    element: <PrivateRoute element={<ProfileSettings />} />,
  },
]

const protectedRoutes = [
  {
    path: '/employee/list',
    element: <PrivateRoute element={<EmployeesList />} />,
  },
  {
    path: '/employee/create',
    element: <PrivateRoute element={<CreateEmployee />} />,
  },
  {
    path: '/employee/:id',
    element: <PrivateRoute element={<EmployeeDetails />} />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...GeneralRoutes.map(route => ({
        ...route,
        element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
      })),
      ...authRoutes.map(route => ({
        ...route,
        element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
      })),
      ...protectedRoutes.map(route => ({
        ...route,
        element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
      })),
      ...settingsRoutes.map(route => ({
        ...route,
        element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
      })),
    ],
  },
])
