import { z } from 'zod';
import { changePasswordFormSchema } from '@/features/global/schema';

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
