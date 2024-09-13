/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from '@/components/ui/loader';
import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

const UsersPage = lazy(() => import('@/features/users/pages/users-page'));
const NewUser = lazy(() => import('@/features/users/pages/new-user'));
const YearsPage = lazy(() => import('@/features/years/pages/years-page'));
const NewYear = lazy(() => import('@/features/years/pages/new-year'));
const MemberContribution = lazy(
  () => import('@/features/members/page/member-contribution')
);
const VoteheadPage = lazy(
  () => import('@/features/voteheads/pages/votehead-page')
);
const VoteheadManagement = lazy(
  () => import('@/features/voteheads/pages/votehead-management')
);

export const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    children: [
      {
        path: 'users',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: 'users/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewUser />
          </Suspense>
        ),
      },
      {
        path: 'years',
        element: (
          <Suspense fallback={<PageLoader />}>
            <YearsPage />
          </Suspense>
        ),
      },
      {
        path: 'years/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewYear />
          </Suspense>
        ),
      },
      {
        path: 'years/edit/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewYear />
          </Suspense>
        ),
      },
      {
        path: 'voteheads',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VoteheadPage />
          </Suspense>
        ),
      },
      {
        path: 'voteheads/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VoteheadManagement />
          </Suspense>
        ),
      },
      {
        path: 'voteheads/edit/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VoteheadManagement isEdit />
          </Suspense>
        ),
      },
      {
        path: 'member-contributions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MemberContribution />
          </Suspense>
        ),
      },
    ],
  },
];
