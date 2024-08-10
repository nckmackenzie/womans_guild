import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import AdminPanelLayout from '@/components/layout/panel-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: <AdminPanelLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
