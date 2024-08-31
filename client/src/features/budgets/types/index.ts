import { z } from 'zod';
import { budgetFormSchema } from '@/features/budgets/schema';
import type { IdWithName, WithId } from '@/types';

export type BudgetFormValues = z.infer<typeof budgetFormSchema>;
export type BudgetItem = BudgetFormValues['details'][number] & WithId;

export interface BudgetTableItem extends IdWithName {
  yearName: string;
  totalAmount: number;
}
