import { createBrowserRouter } from 'react-router-dom';

import AdminPanelLayout from '@/components/layout/panel-layout';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import LoginPage from '@/features/login/pages/login-page';
import UsersPage from '@/features/users/pages/users-page';
import { SessionProvider } from './session-provider';
import NewUser from '@/features/users/pages/new-user';
import YearsPage from '@/features/years/pages/years-page';
import NewYear from '@/features/years/pages/new-year';
import ErrorPage from '@/components/ui/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: (
      <SessionProvider>
        <AdminPanelLayout />
      </SessionProvider>
    ),

    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/admin',
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/new',
            element: <NewUser />,
          },
          {
            path: 'years',
            element: <YearsPage />,
          },
          {
            path: 'years/new',
            element: <NewYear />,
          },
        ],
      },
    ],
  },
]);
