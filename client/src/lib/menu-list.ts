import { LayoutGrid, LucideIcon, Shield } from 'lucide-react';

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
              active: pathname === '/users',
            },
            {
              href: '/admin/years',
              label: 'Financial Years',
              active: pathname === '/years',
            },
            {
              href: '/admin/voteheads',
              label: 'Voteheads',
              active: pathname === '/glaccounts',
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
