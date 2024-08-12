import { z } from 'zod';

import { yearFormSchema } from './schema';

export type YearFormValues = z.infer<typeof yearFormSchema>;
