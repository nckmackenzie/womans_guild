import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import type {
  SendBalancesMessageValues,
  SendMessageValues,
  SmsResponseStatus,
} from '@/features/communication/types';

export async function sendSMS(
  values: SendMessageValues
): Promise<{ status: SmsResponseStatus } | undefined> {
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

export async function sendBalanceSMS(
  values: SendBalancesMessageValues
): Promise<{ status: SmsResponseStatus; message?: string } | undefined> {
  try {
    const { data } = await axios.post('/api/send-balance-sms', values);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || 'An error occurred while sending SMS.'
      );
    }
  }
}
