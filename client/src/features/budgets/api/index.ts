import type {
  BudgetFormValues,
  BudgetTableItem,
} from '@/features/budgets/types';
import axios from '@/lib/axios';
import { handleMutationError, handleQueryError } from '@/lib/utils';

export async function fetchBudgets(
  query?: string
): Promise<{ data: BudgetTableItem[] } | undefined> {
  try {
    const url = query ? `/api/budgets?${query}` : '/api/budgets';
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function createBudget(values: BudgetFormValues) {
  try {
    await axios.post('/api/budgets', values);
  } catch (error) {
    handleMutationError(error);
  }
}
