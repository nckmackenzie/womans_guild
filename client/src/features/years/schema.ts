import { z } from 'zod';

export const yearFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Year is required.' })
      .toLowerCase(),
    start_date: z.coerce.date({ required_error: 'Start date is required' }),
    end_date: z.coerce.date({ required_error: 'End date is required' }),
  })
  .superRefine(({ start_date, end_date }, ctx) => {
    if (start_date > end_date) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date must be before end date',
        path: ['startDate'],
      });
    }
  });
