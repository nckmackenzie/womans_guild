import { DollarSign } from 'lucide-react';

import ContentWrapper from '@/components/layout/content-wrapper';
import RootPage from '@/components/layout/root-page';
import { CreateNewButton } from '@/components/ui/button';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import IncomeDatatable from '@/features/incomes/components/income-table';

import { useTitle } from '@/hooks/use-title';
import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchIncomes } from '@/features/incomes/api';

export default function IncomePage() {
  useTitle('Incomes');
  const { data, error, isLoading } = usePageFetch('incomes', fetchIncomes);

  return (
    <ContentWrapper title="Incomes">
      <div className="space-y-4">
        <CreateNewButton href="new">
          <DollarSign className="icon mr-2" />
          <span>Create new income</span>
        </CreateNewButton>
        {error && <ErrorComponent error={error.message} />}
        <RootPage
          title="Incomes"
          description="A list of all created incomes"
          searchPlaceholder="Search by amount or description"
          hasSearch
        >
          {isLoading ? (
            <TableSkeleton
              rowCount={5}
              columnWidths={['w-24', 'w-32', 'w-24', 'w-12', 'w-1']}
            />
          ) : (
            <IncomeDatatable data={data?.data || []} />
          )}
        </RootPage>
      </div>
    </ContentWrapper>
  );
}
