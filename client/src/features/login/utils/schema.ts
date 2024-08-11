import { validateEmail } from '@/lib/utils';
import { z } from 'zod';

export const loginSchema = z.object({
  contact: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required.' })
    .max(10, { message: 'Invalid phone number' }),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),
});

export const userFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required.' })
      .toLowerCase(),
    contact: z
      .string()
      .min(1, { message: 'Phone number is required.' })
      .max(10, { message: 'Invalid phone number' }),
    email: z.string().optional(),
    password: z.string().min(8, { message: 'Password is required.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm password is required.' }),
    role: z.enum(['admin', 'standard_user']).default('standard_user'),
  })
  .superRefine(({ confirmPassword, password, email }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
    if (email && !validateEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid email address',
        path: ['email'],
      });
    }
  });
