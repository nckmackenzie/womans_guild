import { createBrowserRouter } from 'react-router-dom';

import AdminPanelLayout from '@/components/layout/panel-layout';
import ErrorPage from '@/components/ui/error-page';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import LoginPage from '@/features/login/pages/login-page';
import { adminRoutes } from '@/app/routes/admin-routes';
import { transactionRoutes } from '@/app/routes/transaction-routes';
import { SessionProvider } from '@/app/session-provider';
import { reportRoutes } from '@/app/routes/reports-route';
import ChangePasswordPage from '@/features/global/pages/change-password';
import ForgotPasswordIndexPage from '@/features/change-password/pages';
import ResetPasswordIndexPage from '@/features/reset-password/pages';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordIndexPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordIndexPage />,
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
      {
        path: '/change-password',
        element: <ChangePasswordPage />,
      },
    ],
  },
]);
