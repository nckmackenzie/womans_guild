/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from '@/components/ui/loader';
import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

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
export const transactionRoutes: RouteObject[] = [
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
    path: 'expenses/edit/:id',
    element: (
      <Suspense fallback={<PageLoader />}>
        <CreateEditExpense isEdit />
      </Suspense>
    ),
  },
];
