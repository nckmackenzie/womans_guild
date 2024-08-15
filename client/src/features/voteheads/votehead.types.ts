import { z } from 'zod';
import { VoteheadFormSchema } from './schema';

export type VoteheadType = 'INCOME' | 'EXPENSE';

export type VoteheadFormValues = z.infer<typeof VoteheadFormSchema>;

export type Votehead = VoteheadFormValues & { id: string };
