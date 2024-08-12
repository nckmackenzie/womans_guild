import { isAxiosError } from 'axios';

import axios from '@/lib/axios';
import { type YearFormValues } from './types';
import { flattenErrors } from '@/lib/formatters';

export async function createYear(values: YearFormValues) {
  try {
    await axios.post('/api/years', values);
  } catch (error) {
    if (isAxiosError(error)) {
      const errors = flattenErrors(error.response?.data.errors).join('\n');
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(errors || 'An error occurred while creating the year.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
}
