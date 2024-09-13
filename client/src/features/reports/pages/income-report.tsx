import ContentWrapper from '@/components/layout/content-wrapper';
import IncomeReportAction from '@/features/reports/components/income-report-action';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import IncomeReportTable from '@/features/reports/components/income-report-table';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { useTitle } from '@/hooks/use-title';
import { fetchIncomeReport } from '@/features/reports/api/reports';

export default function IncomeReportPage() {
  useTitle('Income Report');
  const { data, error, isLoading } = usePageFetch(
    'income report',
    fetchIncomeReport,
    undefined,
    true
  );
  return (
    <ContentWrapper title="Income Report">
      <div className="space-y-6">
        <IncomeReportAction />
        {error && <ErrorComponent error={error.message} />}
        {isLoading && (
          <TableSkeleton
            rowCount={5}
            columnWidths={['w-12', 'w-32', 'w-52', 'w-8', 'w-24']}
          />
        )}
        {!isLoading && data && <IncomeReportTable data={data.data} />}
      </div>
    </ContentWrapper>
  );
}
