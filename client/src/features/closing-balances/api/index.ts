import axios from '@/lib/axios';
import type {
  ClosingBalance,
  ClosingBalancesFormValues,
} from '@/features/closing-balances/types';
import { handleMutationError } from '@/lib/utils';

export async function checkYear(id: string): Promise<{ data: boolean }> {
  try {
    const { data } = await axios(`/api/closingbalances/${id}/check`);

    return data;
  } catch (error) {
    throw new Error('Something went wrong while fetching this details');
  }
}

export async function getClosingBalances(
  id: string
): Promise<{ data: ClosingBalance[] }> {
  try {
    const { data } = await axios(`/api/closingbalances/${id}/get`);
    return data;
  } catch (error) {
    throw new Error('Something went wrong while fetching this details');
  }
}

export async function createClosingBalances(values: ClosingBalancesFormValues) {
  try {
    await axios.post('/api/closingbalances', values);
  } catch (error) {
    handleMutationError(error);
  }
}
