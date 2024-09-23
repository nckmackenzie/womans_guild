import { z } from 'zod';

export const incomeProjectionsSchema = z.object({
  yearId: z.string().min(1, 'Select financial year'),
  details: z.array(
    z.object({
      id: z.string(),
      votehead: z.string(),
      voteheadId: z.string(),
      amount: z.coerce.number().min(1, 'Amount is required').positive(),
    })
  ),
});
