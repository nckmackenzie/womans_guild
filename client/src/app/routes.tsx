import { createBrowserRouter } from 'react-router-dom';

import AdminPanelLayout from '@/components/layout/panel-layout';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import LoginPage from '@/features/login/pages/login-page';
import UsersPage from '@/features/users/pages/users-page';
import { SessionProvider } from './session-provider';
import NewUser from '@/features/login/pages/new-user';

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
        children: [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/new',
            element: <NewUser />,
          },
        ],
      },
    ],
  },
]);
