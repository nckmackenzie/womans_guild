import { handleMutationError } from '@/lib/utils';
import type { ChangePasswordFormValues } from '@/features/global/types';
import axios from '@/lib/axios';

export async function changePassword(values: ChangePasswordFormValues) {
  try {
    await axios.patch('/api/changePassword', values);
  } catch (error) {
    handleMutationError(error);
  }
}
