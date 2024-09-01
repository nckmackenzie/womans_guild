/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';
import { PageLoader } from '@/components/ui/loader';

const MembersPage = lazy(() => import('@/features/members/page/members-page'));
const MemberCreateEdit = lazy(
  () => import('@/features/members/page/create-edit')
);
const ExpensesPage = lazy(
  () => import('@/features/expenses/pages/expenses-page')
);
const CreateEditExpense = lazy(
  () => import('@/features/expenses/pages/create-edit')
);
const IncomePage = lazy(() => import('@/features/incomes/pages/income-page'));
const CreateEditIncome = lazy(
  () => import('@/features/incomes/pages/create-edit')
);

const BudgetIndexPage = lazy(() => import('@/features/budgets/pages/index'));
const CreateEditBudget = lazy(
  () => import('@/features/budgets/pages/create-edit')
);

const CommunicationPage = lazy(
  () => import('@/features/communication/pages/index')
);
export const transactionRoutes: RouteObject[] = [
  {
    path: 'transactions',
    children: [
      {
        path: 'members',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MembersPage />
          </Suspense>
        ),
      },
      {
        path: 'members/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MemberCreateEdit />
          </Suspense>
        ),
      },
      {
        path: 'members/edit/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MemberCreateEdit isEdit />
          </Suspense>
        ),
      },
      {
        path: 'expenses',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExpensesPage />
          </Suspense>
        ),
      },
      {
        path: 'expenses/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateEditExpense />
          </Suspense>
        ),
      },
      {
        path: 'incomes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <IncomePage />
          </Suspense>
        ),
      },
      {
        path: 'incomes/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateEditIncome />
          </Suspense>
        ),
      },
      {
        path: 'incomes/edit/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateEditIncome isEdit />
          </Suspense>
        ),
      },
      {
        path: 'budgets',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BudgetIndexPage />
          </Suspense>
        ),
      },
      {
        path: 'budgets/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateEditBudget />
          </Suspense>
        ),
      },
      {
        path: 'communication',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommunicationPage />
          </Suspense>
        ),
      },
    ],
  },
];
