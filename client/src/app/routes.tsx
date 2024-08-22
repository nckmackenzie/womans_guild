import { createBrowserRouter } from 'react-router-dom';

import AdminPanelLayout from '@/components/layout/panel-layout';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import LoginPage from '@/features/login/pages/login-page';
import UsersPage from '@/features/users/pages/users-page';
import { SessionProvider } from './session-provider';
import NewUser from '@/features/users/pages/new-user';
import YearsPage from '@/features/years/pages/years-page';
import NewYear from '@/features/years/pages/new-year';
import ErrorPage from '@/components/ui/error-page';
import NotFound from '@/components/ui/not-found';
import VoteheadPage from '@/features/voteheads/pages/votehead-page';
import VoteheadManagement from '@/features/voteheads/pages/votehead-management';
import MembersPage from '@/features/members/page/members-page';
import MemberCreateEdit from '@/features/members/page/create-edit';
import { PageLoader } from '@/components/ui/loader';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <SessionProvider>
        <AdminPanelLayout />
      </SessionProvider>
    ),

    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/admin',
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/new',
            element: <NewUser />,
          },
          {
            path: 'years',
            element: <YearsPage />,
          },
          {
            path: 'years/new',
            element: <NewYear />,
          },
          {
            path: 'years/edit/:id',
            element: <NewYear />,
          },
          {
            path: 'voteheads',
            element: <VoteheadPage />,
          },
          {
            path: 'voteheads/new',
            element: <VoteheadManagement />,
          },
          {
            path: 'voteheads/edit/:id',
            element: <VoteheadManagement isEdit />,
          },
        ],
      },
      {
        path: '/transactions',
        children: [
          {
            path: 'members',
            element: <MembersPage />,
          },
          {
            path: 'members/new',
            element: <MemberCreateEdit />,
          },
          {
            path: 'members/edit/:id',
            element: <MemberCreateEdit isEdit />,
          },
          {
            path: 'expenses',
            element: <PageLoader />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
