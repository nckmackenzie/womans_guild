import { LayoutGrid, LucideIcon, Shield, Workflow } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '',
          label: 'Admin',
          active: pathname.includes('/admin'),
          icon: Shield,
          submenus: [
            {
              href: '/admin/users',
              label: 'Users',
              active: pathname.includes('/admin/users'),
            },
            {
              href: '/admin/years',
              label: 'Financial Years',
              active: pathname.includes('/admin/years'),
            },
            {
              href: '/admin/voteheads',
              label: 'Voteheads',
              active: pathname.includes('/admin/voteheads'),
            },
          ],
        },
        {
          href: '',
          label: 'Transactions',
          active: pathname.includes('/transactions'),
          icon: Workflow,
          submenus: [
            {
              href: '/transactions/members',
              label: 'Members',
              active: pathname.includes('/transactions/members'),
            },
            {
              href: '/transactions/expenses',
              label: 'Expenses',
              active: pathname.includes('/transactions/expenses'),
            },
          ],
        },
      ],
    },

    // {
    //   groupLabel: 'Settings',
    //   menus: [
    //     {
    //       href: '/users',
    //       label: 'Users',
    //       active: pathname.includes('/users'),
    //       icon: Users,
    //       submenus: [],
    //     },
    //     {
    //       href: '/account',
    //       label: 'Account',
    //       active: pathname.includes('/account'),
    //       icon: Settings,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
