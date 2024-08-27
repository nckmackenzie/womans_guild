import { useQuery } from '@tanstack/react-query';

import { fetchActiveYears } from '@/features/years/api';

export function useActiveYears() {
  const {
    isLoading: isLoadingYears,
    error: yearsError,
    data,
  } = useQuery({
    queryKey: ['activeYears'],
    queryFn: fetchActiveYears,
  });

  const activeYears =
    data?.data.map(year => ({
      label: year.name.toUpperCase(),
      value: year.id,
    })) || [];

  return { isLoadingYears, yearsError, activeYears };
}
