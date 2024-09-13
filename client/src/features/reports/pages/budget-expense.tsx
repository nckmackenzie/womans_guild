import ContentWrapper from '@/components/layout/content-wrapper';
import BudgetExpenseActions from '@/features/reports/components/budget-expense-actions';
import BudgetExpenseTable from '@/features/reports/components/budget-expense-table';
import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchBudgetExpenseReport } from '../api/reports';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';

export default function BudgetExpenseReport() {
  const { data, isLoading, error } = usePageFetch(
    'budget expense',
    fetchBudgetExpenseReport,
    undefined,
    true
  );

  return (
    <ContentWrapper title="BudgetExpense">
      <div className="space-y-6">
        <BudgetExpenseActions />
        {error && <ErrorComponent error={error.message} />}
        {isLoading && (
          <TableSkeleton
            rowCount={10}
            columnWidths={['w-52', 'w-24', 'w-24']}
          />
        )}
        {!isLoading && !error && data && (
          <BudgetExpenseTable data={data.data} />
        )}
      </div>
    </ContentWrapper>
  );
}
