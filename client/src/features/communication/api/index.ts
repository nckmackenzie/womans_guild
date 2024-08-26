import { SendMessageValues } from '@/features/communication/types';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

export async function sendSMS(
  values: SendMessageValues
): Promise<{ status: 'success' | 'failed' } | undefined> {
  try {
    const { data } = await axios.post('/api/send-sms', values);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || 'An error occurred while sending SMS.'
      );
    }
  }
}
