import { z } from 'zod';

import { yearFormSchema } from './schema';

export type YearFormValues = z.infer<typeof yearFormSchema>;
export type Year = YearFormValues & { id: string; is_closed: boolean };
