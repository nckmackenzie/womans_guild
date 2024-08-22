import { useQuery } from '@tanstack/react-query';
import { fetchMemberNo } from '@/features/members/api';

export function useFetchMemberNo(isEdit: boolean) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['memberNo'],
    queryFn: fetchMemberNo,
    enabled: !isEdit,
    refetchInterval: false,
  });
  return { isLoading, error, data };
}
