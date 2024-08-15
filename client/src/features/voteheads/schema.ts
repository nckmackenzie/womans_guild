import { z } from 'zod';

export const VoteheadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required.' })
    .toLowerCase(),
  voteheadType: z.enum(['INCOME', 'EXPENSE'], {
    required_error: 'Category is required.',
  }),
  isActive: z.boolean().default(true),
});
