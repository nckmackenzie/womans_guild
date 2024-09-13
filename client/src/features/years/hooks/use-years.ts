import { useQuery } from '@tanstack/react-query';

import { fetchYears } from '@/features/years/api';

export function useYears() {
  const {
    isLoading: isLoadingYears,
    error: yearsError,
    data,
  } = useQuery({
    queryKey: ['all years'],
    queryFn: () => fetchYears(),
  });

  const years =
    data?.data.map(year => ({
      label: year.name.toUpperCase(),
      value: year.id,
    })) || [];

  return { isLoadingYears, yearsError, years };
}
