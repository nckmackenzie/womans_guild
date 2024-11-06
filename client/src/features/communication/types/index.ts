import type { IdWithName } from '@/types';

export interface SendMessageFormValues {
  members: {
    value: string[];
    error: string | null;
  };
  message: {
    value: string;
    error: string | null;
  };
}

export interface SendMessageValues {
  recipients: string[];
  message: string;
}

export interface SmsItem extends IdWithName {
  balance: number;
}

export type SmsResponseStatus = 'success' | 'failed';
export interface SendBalancesMessageValues {
  recipients: SmsItem[];
}
