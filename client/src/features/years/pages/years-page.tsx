import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { CreateNewButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Search from '@/components/ui/search';

import { fetchYears } from '../api';
import YearsDatatable, {
  YearsTableSkeleton,
} from '../components/years-datatable';

export default function YearsPage() {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString() ?? undefined;

  const { isLoading, error, data } = useQuery({
    queryKey: ['years', queryString],
    queryFn: () => fetchYears(queryString),
    refetchInterval: false,
  });

  return (
    <ContentWrapper title="Financial Years">
      <div className="space-y-6">
        <CreateNewButton href="/admin/years/new">
          <Calendar className="mr-2 size-4" />
          <span>Create New Year</span>
        </CreateNewButton>
        {!isLoading && error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>Financial Years</CardTitle>
            <CardDescription>A list of all created years.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Search
              placeholder="Search by year name..."
              className="w-full md:w-72"
            />
            {isLoading && <YearsTableSkeleton />}
            {data && <YearsDatatable data={data.data} />}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
