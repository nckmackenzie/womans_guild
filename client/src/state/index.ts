import { useQuery, useQueryClient } from '@tanstack/react-query';

export function createGlobalState<T>(
  queryKey: unknown,
  initialData: T | null = null
) {
  return function () {
    const queryClient = useQueryClient();
    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData([queryKey], data);
    }

    function reset() {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.refetchQueries({ queryKey: [queryKey] });
    }

    return { data, setData, reset };
  };
}
