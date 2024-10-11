import { z } from 'zod';
import { closingBalanceFormSchema } from '@/features/closing-balances/schema';
import { IdWithName } from '@/types';
import { MemberShipStatus } from '@/features/members/types';

export type ClosingBalancesFormValues = z.infer<
  typeof closingBalanceFormSchema
>;

export type ClosingBalance = IdWithName & {
  status: MemberShipStatus;
  balanceBf: number;
  yearContributions: number;
  totalContributions: number;
  closingBalance: number;
};
