import { z } from 'zod';

export const closingBalanceFormSchema = z.object({
  yearId: z
    .string({ required_error: 'Select financial year' })
    .trim()
    .min(1, 'Select financial year'),
  details: z.array(
    z.object({
      memberId: z.string(),
      memberName: z.string(),
      previousBalance: z.coerce.number(),
      yearContribution: z.coerce.number(),
      amountPaid: z.coerce.number(),
      balance: z.coerce.number(),
    })
  ),
});
