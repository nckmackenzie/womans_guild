import CustomSearchSelect from '@/components/ui/custom-search-select';
import Search from '@/components/ui/search';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchVoteheads } from '@/features/voteheads/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function ExpenseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['voteheads'],
    queryFn: () => fetchVoteheads(),
  });

  const voteheads = data?.data
    ? data.data.map(vt => ({ value: vt.id, label: vt.name.toUpperCase() }))
    : [];
  if (error) {
    toast.error('Error fetching voteheads');
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <Search placeholder="Search by amount" />
      {isLoading ? (
        <Skeleton className="w-full md:w-96 h-10" />
      ) : (
        <div className="w-full md:w-96">
          <CustomSearchSelect
            options={voteheads}
            placeholder="Filter by votehead"
            onChange={(value: string) => {
              if (value.trim() !== '') {
                searchParams.set('votehead', value);
              } else {
                searchParams.delete('votehead');
              }
              setSearchParams(searchParams);
            }}
            value={searchParams.get('votehead') || undefined}
          />
        </div>
      )}
    </div>
  );
}
