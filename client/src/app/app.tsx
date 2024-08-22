import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SessionProvider } from '@/app/session-provider';
import LoginPage from '@/features/login/pages/login-page';
import AdminPanelLayout from '@/components/layout/panel-layout';
import { PageLoader } from '@/components/ui/loader';
import { adminRoutes } from '@/app/routes/admin-routes';
import { transactionRoutes } from '@/app/routes/transaction-routes';

const DashboardPage = React.lazy(
  () => import('@/features/dashboard/pages/dashboard-page')
);
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <SessionProvider>
              <AdminPanelLayout />
            </SessionProvider>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            }
          />

          {adminRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/transactions">
            {transactionRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
