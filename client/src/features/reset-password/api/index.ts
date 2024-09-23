import { handleMutationError } from '@/lib/utils';
import { type ResetPasswordFormValues } from '@/features/reset-password/components/reset-password-form';
import axios from '@/lib/axios';

export async function resetPassword(values: ResetPasswordFormValues) {
  try {
    await axios.patch('/api/resetPassword', values);
  } catch (error) {
    handleMutationError(error);
  }
}
