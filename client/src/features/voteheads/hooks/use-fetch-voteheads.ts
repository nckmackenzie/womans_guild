import { useQuery } from '@tanstack/react-query';

import { fetchVoteheadsByType } from '@/features/voteheads/api';
import { VoteheadType } from '@/features/voteheads/votehead.types';

export function useFetchVoteheads(voteheadType: VoteheadType) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['voteheads'],
    queryFn: () => fetchVoteheadsByType(voteheadType),
  });

  const voteheads = data?.data
    ? data.data.map(vt => ({ value: vt.id, label: vt.name.toUpperCase() }))
    : [];

  return { isLoading, voteheads, error };
}
