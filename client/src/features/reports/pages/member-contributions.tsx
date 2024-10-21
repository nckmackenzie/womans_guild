import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { toast } from 'sonner';
import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormFieldLoading from '@/components/ui/form-field-loading';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import ContributionsTable from '@/features/reports/components/contributions-table';
import { TableSkeleton } from '@/components/ui/table-skeleton';

import { useYears } from '@/features/years/hooks/use-years';
import { fetchClosingBalances } from '@/features/reports/api/reports';

export default function MemberContributions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['closing balances', searchParams.get('year')],
    queryFn: () => fetchClosingBalances(searchParams.get('year') as string),
    enabled: !!searchParams.get('year'),
  });
  const { isLoadingYears, years, yearsError } = useYears();
  const [yearId, setYearId] = useState<string>();

  function handleClick() {
    if (!yearId) {
      toast.error('Select year');
      return;
    }
    searchParams.set('year', yearId);
    setSearchParams(searchParams);
  }

  return (
    <ContentWrapper title="Member contributions">
      <div className="space-y-6">
        {(yearsError || error) && (
          <ErrorComponent error={yearsError?.message || error?.message} />
        )}
        <div className="space-y-4">
          {isLoadingYears ? (
            <FormFieldLoading className="w-96" label="Year" />
          ) : (
            <FormGroup className="w-96">
              <Label>Year</Label>
              <CustomSearchSelect
                enableClear={false}
                options={years}
                onChange={setYearId}
              />
            </FormGroup>
          )}
          <Button onClick={handleClick}>Preview</Button>
        </div>
        {searchParams.get('year') && (
          <>
            {isLoading ? (
              <TableSkeleton
                rowCount={10}
                columnWidths={['w-56', 'w-24', 'w-24', 'w-24', 'w-24']}
              />
            ) : (
              <ContributionsTable
                data={data?.data.filter(dt => dt.status === 'active') || []}
              />
            )}
          </>
        )}
      </div>
    </ContentWrapper>
  );
}
