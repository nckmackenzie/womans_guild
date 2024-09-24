import { handleMutationError } from '@/lib/utils';
import type {
  IncomeProjectionsFormValues,
  IncomeProjectionTableRow,
} from '@/features/income-projection/types';
import axios from '@/lib/axios';

export async function fetchIncomeProjections(): Promise<{
  data: IncomeProjectionTableRow[];
}> {
  try {
    const { data } = await axios.get('/api/incomeProjections');
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error('Something went wrong while fetching income projections');
  }
}
export async function createIncomeProjection(
  values: IncomeProjectionsFormValues
) {
  try {
    await axios.post('/api/incomeProjections', values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function fetchIncomeProjection(
  id: string
): Promise<{ data: IncomeProjectionsFormValues }> {
  try {
    const { data } = await axios.get(`/api/incomeProjections/${id}`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error('Something went wrong while fetching income projections');
  }
}

export async function updateIncomeProjection(
  id: string,
  values: IncomeProjectionsFormValues
) {
  try {
    await axios.patch(`/api/incomeProjections/${id}`, values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function deleteIncomeProjection(id: string) {
  try {
    await axios.delete(`/api/incomeProjections/${id}`);
  } catch (error) {
    handleMutationError(error);
  }
}
