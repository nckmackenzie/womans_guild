import { ChartNoAxesCombined } from 'lucide-react';

import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IncomeProjectionsTable from '@/features/income-projection/components/income-projections-table';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { TableSkeleton } from '@/components/ui/table-skeleton';

import { useTitle } from '@/hooks/use-title';
import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchIncomeProjections } from '@/features/income-projection/api';

export default function IncomeProjectionIndex() {
  useTitle('Income Projection');
  const { data, error, isLoading } = usePageFetch(
    'income projections',
    fetchIncomeProjections
  );
  return (
    <ContentWrapper title="Income Projection">
      <div className="space-y-4">
        <CreateNewButton href="/transactions/income-projections/new">
          <ChartNoAxesCombined className="icon mr-2" />
          <span>Create New Projection</span>
        </CreateNewButton>
        {error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>Income Projections</CardTitle>
            <CardDescription>
              A list of all created income projections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton
                rowCount={5}
                columnWidths={['w-24', 'w-16', 'w-1']}
              />
            ) : (
              <IncomeProjectionsTable data={data?.data || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
