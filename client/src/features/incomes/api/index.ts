import type {
  IncomeFormValues,
  IncomeTableRow,
} from '@/features/incomes/types';
import axios from '@/lib/axios';
import { handleMutationError, handleQueryError } from '@/lib/utils';
import { WithId } from '@/types';

export async function fetchIncomes(
  query?: string
): Promise<{ data: IncomeTableRow[] } | undefined> {
  try {
    const { data } = await axios(
      query ? `/api/incomes?${query}` : '/api/incomes'
    );
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function createIncome(values: IncomeFormValues) {
  try {
    await axios.post('/api/incomes', values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function fetchIncome(
  id: string
): Promise<{ data: IncomeFormValues & WithId } | undefined> {
  try {
    const { data } = await axios(`/api/incomes/${id}`);
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function updateIncome(id: string, values: IncomeFormValues) {
  try {
    await axios.patch(`/api/incomes/${id}`, values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function deleteIncome(id: string) {
  try {
    await axios.delete(`/api/incomes/${id}`);
  } catch (error) {
    handleMutationError(error);
  }
}
