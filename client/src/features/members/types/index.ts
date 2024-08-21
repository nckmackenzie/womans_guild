import { z } from 'zod';
import { membersFormSchema } from '../utils/schema';

type MemberFormValues = z.infer<typeof membersFormSchema>;

export type MemberShipStatus = MemberFormValues['status'];

export interface Member extends MemberFormValues {
  id: string;
  memberNo: number;
}
