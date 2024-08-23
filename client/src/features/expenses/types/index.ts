import { z } from 'zod';
import { expensesFormSchema } from '@/features/expenses/schema';
import type { IdWithName, WithId } from '@/types';

export type ExpenseFormValues = z.infer<typeof expensesFormSchema>;

export interface Expense extends ExpenseFormValues, WithId {
  member: IdWithName;
  votehead: IdWithName;
}
