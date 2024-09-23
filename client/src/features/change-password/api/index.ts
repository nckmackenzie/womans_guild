import axios from '@/lib/axios';
import { handleMutationError } from '@/lib/utils';

export async function forgotPassword(values: {
  contact: string;
}): Promise<{ message: string; token: string } | undefined> {
  try {
    const { data } = await axios.post('/api/forgotPassword', values);

    return data;
  } catch (error) {
    handleMutationError(error);
  }
}
