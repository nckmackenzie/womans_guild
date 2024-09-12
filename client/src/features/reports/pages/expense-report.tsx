import ContentWrapper from '@/components/layout/content-wrapper';
import ExpenseReportAction from '@/features/reports/components/expense-report-action';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import ExpenseReportTable from '@/features/reports/components/expense-report-table';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchExpenseReport } from '@/features/reports/api/reports';

export default function ExpenseReportPage() {
  const { data, error, isLoading } = usePageFetch(
    'expense report',
    fetchExpenseReport,
    undefined,
    true
  );
  return (
    <ContentWrapper title="Expense Report">
      <div className="space-y-6">
        <ExpenseReportAction />
        {error && <ErrorComponent error={error.message} />}
        {isLoading && (
          <TableSkeleton
            rowCount={5}
            columnWidths={['w-12', 'w-32', 'w-16', 'w-8', 'w-24']}
          />
        )}
        {!isLoading && data && <ExpenseReportTable data={data.data} />}
      </div>
    </ContentWrapper>
  );
}
