import {
  ClipboardMinus,
  LayoutGrid,
  LucideIcon,
  Shield,
  Workflow,
} from 'lucide-react';

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
            {
              href: '/admin/member-contributions',
              label: 'Set Member Contribution',
              active: pathname.includes('/admin/member-contributions'),
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
              href: '/transactions/members/promotion',
              label: 'Member Promotion',
              active: pathname.includes('/transactions/members/promotion'),
            },
            {
              href: '/transactions/expenses',
              label: 'Expenses',
              active: pathname.includes('/transactions/expenses'),
            },
            {
              href: '/transactions/incomes',
              label: 'Income',
              active: pathname.includes('/transactions/incomes'),
            },
            {
              href: '/transactions/incomes-projection',
              label: 'Income Projection',
              active: pathname.includes('/transactions/incomes-projection'),
            },
            {
              href: '/transactions/budgets',
              label: 'Budgets',
              active: pathname.includes('/transactions/budgets'),
            },
            {
              href: '/transactions/communication',
              label: 'Communication',
              active: pathname.includes('/transactions/communication'),
            },
          ],
        },
        {
          href: '',
          label: 'Reports',
          active: pathname.includes('/reports'),
          icon: ClipboardMinus,
          submenus: [
            {
              href: '/reports/members',
              label: 'Members Report',
              active: pathname.includes('/reports/members'),
            },
            {
              href: '/reports/expenses',
              label: 'Expenses Report',
              active: pathname.includes('/reports/expenses'),
            },
            {
              href: '/reports/incomes',
              label: 'Incomes Report',
              active: pathname.includes('/reports/incomes'),
            },
            {
              href: '/reports/budget-expense',
              label: 'Budget Vs Expense',
              active: pathname.includes('/reports/budget-expense'),
            },
            {
              href: '/reports/income-statement',
              label: 'Income Statement',
              active: pathname.includes('/reports/income-statement'),
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
