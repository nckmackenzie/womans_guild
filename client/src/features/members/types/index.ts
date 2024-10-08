import { z } from 'zod';
import {
  memberContributionFormSchema,
  memberPromotionSchema,
  membersFormSchema,
} from '@/features/members/utils/schema';

export type MemberShipType = 'full' | 'follower';

export type MemberFormValues = z.infer<typeof membersFormSchema>;

export type MemberShipStatus = MemberFormValues['status'];

export interface Member extends MemberFormValues {
  id: string;
  memberNo: number;
}

export type MemberPromotionValues = z.infer<typeof memberPromotionSchema>;

export type MemberContributionValues = z.infer<
  typeof memberContributionFormSchema
>;
