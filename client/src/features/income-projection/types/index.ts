import { z } from 'zod';
import { incomeProjectionsSchema } from '@/features/income-projection/schema';
import { WithId } from '@/types';

export type IncomeProjectionsFormValues = z.infer<
  typeof incomeProjectionsSchema
>;

export interface IncomeProjectionTableRow extends WithId {
  yearName: string;
  totalAmount: number;
}
