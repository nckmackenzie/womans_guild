import { useQuery } from '@tanstack/react-query';

import { fetchActiveMembers } from '@/features/members/api';

export function useMembers() {
  const {
    isLoading: isLoadingMembers,
    error,
    data,
  } = useQuery({
    queryKey: ['members active'],
    queryFn: fetchActiveMembers,
    refetchInterval: false,
  });

  const members =
    data?.data.map(member => ({
      value: member.id,
      label: member.name.toUpperCase(),
    })) || [];

  return { members, error, isLoadingMembers };
}
