import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .max(10, 'Invalid phone number'),
});
