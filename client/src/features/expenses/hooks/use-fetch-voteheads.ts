import { useQuery } from '@tanstack/react-query';

import { fetchVoteheads } from '@/features/voteheads/api';

export function useFetchVoteheads() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['voteheads'],
    queryFn: () => fetchVoteheads(),
  });

  const voteheads = data?.data
    ? data.data.map(vt => ({ value: vt.id, label: vt.name.toUpperCase() }))
    : [];

  return { isLoading, voteheads, error };
}
