import { z } from 'zod';
import { incomeProjectionsSchema } from '@/features/income-projection/schema';

export type IncomeProjectionsFormValues = z.infer<
  typeof incomeProjectionsSchema
>;
