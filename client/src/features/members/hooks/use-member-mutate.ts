import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { createMember, updateMember } from '@/features/members/api';
import type { MemberFormValues } from '@/features/members/types';

export function useMutateMember() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: (values: MemberFormValues) => {
      if (!isEdit) {
        return createMember(values);
      } else {
        if (!id) throw new Error('Member id not found');
        return updateMember(id, values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      navigate('/transactions/members');
    },
    // onError: error => onError(error.message.split('\n')),
  });

  return { isPending, mutate };
}
