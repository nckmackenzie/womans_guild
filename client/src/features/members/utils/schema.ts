import { z } from 'zod';

export const membersFormSchema = z.object({
  name: z.string().trim().min(1, 'Member Name is required').toLowerCase(),
  contact: z
    .string()
    .trim()
    .min(1, 'Phone no is required')
    .max(10, 'Invalid phone number'),
  birthDate: z.coerce.date().optional(),
  idNumber: z.string().optional(),
  joiningDate: z.coerce.date().optional(),
  status: z
    .enum(['active', 'inactive', 'departed', 'deceased'])
    .default('active'),
});
