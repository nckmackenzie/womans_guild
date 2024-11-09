import {
  HandCoins,
  Hourglass,
  Receipt,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorComponent } from '@/components/ui/basic-alert';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchDashboardData } from '@/features/dashboard/api';
import { compactNumberFormatter } from '@/lib/formatters';

export default function StatCards() {
  const { data, error, isLoading } = usePageFetch(
    'dashboard',
    fetchDashboardData
  );
  if (isLoading) return <LoadingSkeletons />;
  if (error) return <ErrorComponent error={error.message} />;

  const expensesTotal = data?.data?.totalExpenses || 0;
  const incomeTotal = data?.data?.totalIncomes || 0;
  const memberWithBalances = data?.data.memberWithBalances || 0;
  // const memberWithBalances =
  //   data?.data?.memberWithBalances.filter(m => Number(m.closingBalance) > 0) ||
  //   0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Members"
        Icon={Users}
        description="Total number of members in the platform"
        value={`${data?.data?.totalMembers || 0} Members`}
      />
      <DashboardCard
        title="Income"
        Icon={HandCoins}
        description="Income collected from current year"
        value={`Ksh. ${compactNumberFormatter(incomeTotal)}`}
      />
      <DashboardCard
        title="Expense"
        Icon={Receipt}
        description="Expenses incurred in current year"
        value={`Ksh. ${compactNumberFormatter(expensesTotal)}`}
      />
      <DashboardCard
        title="Pending Members"
        Icon={Hourglass}
        description="Members with  balances"
        value={memberWithBalances.toString()}
      />
    </div>
  );
}

function LoadingSkeletons() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  Icon: LucideIcon;
}

function DashboardCard({
  Icon,
  description,
  title,
  value,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
