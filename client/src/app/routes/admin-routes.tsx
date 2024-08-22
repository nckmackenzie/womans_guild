/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from '@/components/ui/loader';
import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

const UsersPage = lazy(() => import('@/features/users/pages/users-page'));
const NewUser = lazy(() => import('@/features/users/pages/new-user'));
const YearsPage = lazy(() => import('@/features/years/pages/years-page'));
const NewYear = lazy(() => import('@/features/years/pages/new-year'));
const VoteheadPage = lazy(
  () => import('@/features/voteheads/pages/votehead-page')
);
const VoteheadManagement = lazy(
  () => import('@/features/voteheads/pages/votehead-management')
);

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/users',
    element: (
      <Suspense fallback={<PageLoader />}>
        <UsersPage />
      </Suspense>
    ),
  },
  {
    path: '/admin/users/new',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NewUser />
      </Suspense>
    ),
  },
  {
    path: '/admin/years',
    element: (
      <Suspense fallback={<PageLoader />}>
        <YearsPage />
      </Suspense>
    ),
  },
  {
    path: '/admin/years/new',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NewYear />
      </Suspense>
    ),
  },
  {
    path: '/admin/years/edit/:id',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NewYear />
      </Suspense>
    ),
  },
  {
    path: '/admin/voteheads',
    element: (
      <Suspense fallback={<PageLoader />}>
        <VoteheadPage />
      </Suspense>
    ),
  },
  {
    path: '/admin/voteheads/new',
    element: (
      <Suspense fallback={<PageLoader />}>
        <VoteheadManagement />
      </Suspense>
    ),
  },
  {
    path: '/admin/voteheads/edit/:id',
    element: (
      <Suspense fallback={<PageLoader />}>
        <VoteheadManagement isEdit />
      </Suspense>
    ),
  },
];
