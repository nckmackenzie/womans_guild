import ContentWrapper from '@/components/layout/content-wrapper';
import MemberReportActions from '@/features/reports/components/member-report-actions';
import MemberReportTable from '@/features/reports/components/member-report-table';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { useTitle } from '@/hooks/use-title';
import { fetchMembersReport } from '@/features/reports/api/reports';

export default function MembersReportPage() {
  useTitle('Members Report');
  const { data, error, isLoading } = usePageFetch(
    'members report',
    fetchMembersReport,
    undefined,
    true
  );

  return (
    <ContentWrapper title="Members Report">
      <div className="space-y-8">
        {error && <ErrorComponent error={error.message} />}
        <MemberReportActions />
        {isLoading && (
          <TableSkeleton
            rowCount={10}
            columnWidths={['w-20', 'w-52', 'w-20', 'w-48', 'w-32']}
          />
        )}
        {!isLoading && !error && data && <MemberReportTable data={data.data} />}
      </div>
    </ContentWrapper>
  );
}
