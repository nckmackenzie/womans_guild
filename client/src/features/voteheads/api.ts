import { isAxiosError } from 'axios';

import axios from '@/lib/axios';
import type { Votehead, VoteheadFormValues } from './votehead.types';
import { flattenErrors } from '@/lib/formatters';

export async function createUpdateVotehead(
  values: VoteheadFormValues,
  id?: string
) {
  try {
    if (!id) {
      await axios.post('/api/voteheads', values);
    } else {
      await axios.patch(`/api/voteheads/${id}`, values);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      const errors = flattenErrors(error.response?.data.errors).join('\n');
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(
        errors || 'An error occurred while creating the votehead.'
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
}

export async function fetchVoteheads(
  queryString?: string
): Promise<{ data: Votehead[] }> {
  try {
    const url = queryString
      ? '/api/voteheads?search=' + queryString
      : '/api/voteheads';
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

export async function fetchVotehead(
  id: string | undefined
): Promise<{ data: Votehead }> {
  if (!id) throw new Error('ID is required');
  try {
    const { data } = await axios.get(`/api/voteheads/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'An error occurred while fetching data.'
      );
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred while fetching data.');
  }
}

export async function deleteVotehead(id: string) {
  try {
    await axios.delete(`/api/voteheads/${id}`);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'An error occurred while fetching data.'
      );
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred while fetching data.');
  }
}
