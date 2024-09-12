import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function usePageFetch<T>(
  queryKey: string,
  queryFn: (queryString?: string) => Promise<T>,
  refetchInterval?: number,
  report?: boolean
) {
  const [searchParams] = useSearchParams();

  // const queryString = searchParams.get('search') ?? undefined;
  const queryString = searchParams.toString() ?? undefined;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: () => queryFn(queryString),
    refetchInterval: refetchInterval ? refetchInterval : false,
    enabled: report ? !!queryString : true,
  });

  return { isLoading, error, data, refetch };
}
