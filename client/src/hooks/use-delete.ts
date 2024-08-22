import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDelete(
  queryKey: string,
  deleteFn: (id: string) => Promise<void>,
  message?: string
) {
  const queryClient = useQueryClient();
  const { isPending, mutate: destroy } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(message || 'Deleted successfully');
    },
    onError: error => {
      console.log(error);
      toast.error('There was a problem deleting the selected transaction');
    },
  });

  return { isPending, destroy };
}
