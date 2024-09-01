import { addDays } from 'date-fns';
import { z } from 'zod';

export const incomeFormSchema = z.object({
  date: z.coerce
    .date()
    .max(addDays(new Date(), 1), {
      message: 'Date cannot be greater than today.',
    }),
  voteheadId: z.string().min(1, 'Select income vote head'),
  memberId: z.string().optional(),
  amount: z.coerce
    .number({ invalid_type_error: 'Enter valid amount' })
    .min(1, 'Amount is required')
    .positive('Income cannot be less than zero'),
  description: z.string().trim().toLowerCase().optional(),
});
