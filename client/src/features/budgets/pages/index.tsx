import { Briefcase } from 'lucide-react';

import ContentWrapper from '@/components/layout/content-wrapper';
import RootPage from '@/components/layout/root-page';
import { CreateNewButton } from '@/components/ui/button';
import BudgetsTable from '@/features/budgets/components/budgets-table';

import { useTitle } from '@/hooks/use-title';
import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchBudgets } from '@/features/budgets/api';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { ErrorComponent } from '@/components/ui/basic-alert';

export default function BudgetIndexPage() {
  const { data, error, isLoading } = usePageFetch('budgets', fetchBudgets);
  useTitle('Budgets');
  return (
    <ContentWrapper title="Budgets">
      <div className="space-y-4">
        <CreateNewButton href="/transactions/budgets/new">
          <Briefcase className="icon mr-2" />
          <span>Create New Budget</span>
        </CreateNewButton>
        {error && <ErrorComponent error={error.message} />}
        <RootPage
          title="Budgets"
          description="A list of all created budgets."
          searchPlaceholder="Search by budget name..."
        >
          {isLoading ? (
            <TableSkeleton
              rowCount={5}
              columnWidths={['w-52', 'w-24', 'w-24']}
            />
          ) : (
            <BudgetsTable data={data?.data || []} />
          )}
        </RootPage>
      </div>
    </ContentWrapper>
  );
}
