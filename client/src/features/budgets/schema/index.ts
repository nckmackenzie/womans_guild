import { z } from 'zod';

export const budgetFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').toLowerCase(),
  yearId: z.string().min(1, 'Select financial year'),
  details: z.array(
    z.object({
      id: z.string().min(1, 'Select votehead'),
      voteheadId: z.string().min(1, 'Votehead is required'),
      voteheadName: z.string().trim(),
      amount: z.coerce
        .number({ invalid_type_error: 'Enter valid amount' })
        .min(1, 'Amount is required')
        .positive('Expense cannot be less than zero'),
      description: z.string().trim().toLowerCase().optional(),
    })
  ),
});
