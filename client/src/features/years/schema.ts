import { z } from 'zod';

export const yearFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Year is required.' })
      .toLowerCase(),
    startDate: z.coerce.date({ required_error: 'Start date is required' }),
    endDate: z.coerce.date({ required_error: 'End date is required' }),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate > endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date must be before end date',
        path: ['startDate'],
      });
    }
  });
