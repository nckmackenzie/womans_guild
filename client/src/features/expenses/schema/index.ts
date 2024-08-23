import { z } from 'zod';

export const expensesFormSchema = z.object({
  date: z.coerce
    .date()
    .max(new Date(), { message: 'Date cannot be greater than today.' }),
  voteheadId: z.string().min(1, 'Select votehead'),
  amount: z.coerce
    .number({ invalid_type_error: 'Enter valid amount' })
    .min(1, 'Amount is required')
    .positive('Expense cannot be less than zero'),
  paymentMethod: z.enum(['cash', 'mpesa', 'cheque', 'bank'], {
    required_error: 'Payment method is required.',
  }),
  paymentReference: z
    .string()
    .trim()
    .min(1, 'Reference is required')
    .toLowerCase(),
  reference: z.string().optional(),
  memberId: z.string().optional(),
  description: z.string().trim().toLowerCase().optional(),
  attachmentPath: z.string().optional(),
});
