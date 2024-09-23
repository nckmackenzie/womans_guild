import axios from '@/lib/axios';
import { handleMutationError } from '@/lib/utils';

export async function forgotPassword(values: { contact: string }) {
  try {
    await axios.post('/api/forgotPassword', values);
  } catch (error) {
    handleMutationError(error);
  }
}
