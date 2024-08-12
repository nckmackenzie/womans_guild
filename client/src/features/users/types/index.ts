import { z } from 'zod';

import { userFormSchema } from '../utils/schema';

export type UserFormValues = z.infer<typeof userFormSchema>;
export type ReturnedUser = Omit<
  UserFormValues,
  'password' | 'confirmPassword'
> & {
  created_at: string;
  updated_at: string;
  id: number;
  active: boolean;
};
