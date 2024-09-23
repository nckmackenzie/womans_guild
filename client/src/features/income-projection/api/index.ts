import { handleMutationError } from '@/lib/utils';
import type { IncomeProjectionsFormValues } from '@/features/income-projection/types';
import axios from '@/lib/axios';

export async function createIncomeProjection(
  values: IncomeProjectionsFormValues
) {
  try {
    await axios.post('/api/incomeProjections', values);
  } catch (error) {
    handleMutationError(error);
  }
}
