import { isAxiosError } from 'axios';

import axios from '@/lib/axios';
import { Year, type YearFormValues } from './types';
import { flattenErrors } from '@/lib/formatters';

export async function createYear(values: YearFormValues, id?: string) {
  try {
    if (!id) {
      await axios.post('/api/years', values);
    } else {
      await axios.patch(`/api/years/${id}`, values);
    }
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

export async function fetchYears(query?: string): Promise<{ data: Year[] }> {
  try {
    const { data } = await axios.get(
      query ? `/api/years?search=${query}` : '/api/years'
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

export async function fetchYear(id: string): Promise<{ data: Year }> {
  try {
    const { data } = await axios.get(`/api/years/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}
