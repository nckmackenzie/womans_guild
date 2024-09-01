import { z } from 'zod';
import { incomeFormSchema } from '@/features/incomes/schema';
import { WithId } from '@/types';

export type IncomeFormValues = z.infer<typeof incomeFormSchema>;
export type IncomeTableRow = Omit<IncomeFormValues, 'description'> &
  WithId & {
    memberName: string;
    voteheadName: string;
  };
