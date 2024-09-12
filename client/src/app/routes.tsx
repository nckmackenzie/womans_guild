import { createBrowserRouter } from 'react-router-dom';

import AdminPanelLayout from '@/components/layout/panel-layout';
import ErrorPage from '@/components/ui/error-page';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import LoginPage from '@/features/login/pages/login-page';
import { adminRoutes } from '@/app/routes/admin-routes';
import { transactionRoutes } from '@/app/routes/transaction-routes';
import { SessionProvider } from '@/app/session-provider';
import { reportRoutes } from '@/app/routes/reports-route';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      <SessionProvider>
        <AdminPanelLayout />
      </SessionProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      ...adminRoutes,
      ...transactionRoutes,
      ...reportRoutes,
    ],
  },
]);
