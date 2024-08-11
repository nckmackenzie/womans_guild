import { z } from 'zod';
import { loginSchema } from '../utils/schema';

export type LoginFormValues = z.infer<typeof loginSchema>;
