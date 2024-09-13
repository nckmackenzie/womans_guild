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
  joiningDate: z.coerce.date({ required_error: 'Joining date is required' }),
  status: z
    .enum(['active', 'inactive', 'departed', 'deceased'])
    .default('active'),
  membershipType: z.enum(['full', 'follower']).default('follower'),
});

export const memberPromotionSchema = z
  .object({
    memberIds: z.array(z.string(), {
      required_error: 'Select at least one member.',
    }),
    promotionDate: z.coerce.date({
      required_error: 'Select promotion date.',
      invalid_type_error: 'Select promotion date.',
    }),
  })
  .superRefine(({ memberIds, promotionDate }, ctx) => {
    if (memberIds.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Select at least one member.',
      });
    }
    if (!promotionDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Select promotion date.',
      });
    }
    if (promotionDate > new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Promotion date cannot be in the future.',
      });
    }
  });
