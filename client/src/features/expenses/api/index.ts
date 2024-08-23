import type { Expense, ExpenseFormValues } from '@/features/expenses/types';
import axios from '@/lib/axios';
import { handleMutationError, handleQueryError } from '@/lib/utils';

export async function fetchExpenses(
  searchParameters?: string
): Promise<{ data: Expense[] } | undefined> {
  const url = searchParameters
    ? `/api/expenses?${searchParameters}`
    : '/api/expenses';
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function createExpense(values: ExpenseFormValues) {
  try {
    await axios.post('/api/expenses', values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function fetchExpense(
  id: string
): Promise<{ data: Expense } | undefined> {
  try {
    const { data } = await axios.get(`/api/expenses/${id}`);
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function updateExpense(id: string, values: ExpenseFormValues) {
  try {
    await axios.patch(`/api/expenses/${id}`, values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function deleteExpense(id: string) {
  try {
    await axios.delete(`/api/expenses/${id}`);
  } catch (error) {
    handleMutationError(error);
  }
}
