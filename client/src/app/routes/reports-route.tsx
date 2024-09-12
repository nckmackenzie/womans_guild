/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

import { PageLoader } from '@/components/ui/loader';

const MembersReportPage = lazy(
  () => import('@/features/reports/pages/members-report')
);

const ExpenseReportPage = lazy(
  () => import('@/features/reports/pages/expense-report')
);

export const reportRoutes: RouteObject[] = [
  {
    path: 'reports',
    children: [
      {
        path: 'members',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MembersReportPage />
          </Suspense>
        ),
      },
      {
        path: 'expenses',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExpenseReportPage />
          </Suspense>
        ),
      },
    ],
  },
];
