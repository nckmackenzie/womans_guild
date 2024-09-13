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

const IncomeReportPage = lazy(
  () => import('@/features/reports/pages/income-report')
);

const BudgetExpenseReport = lazy(
  () => import('@/features/reports/pages/budget-expense')
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
      {
        path: 'incomes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <IncomeReportPage />
          </Suspense>
        ),
      },
      {
        path: 'budget-expense',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BudgetExpenseReport />
          </Suspense>
        ),
      },
    ],
  },
];
