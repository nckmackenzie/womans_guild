import { ClosingBalance } from '@/features/closing-balances/types';

export interface DashboardCardsData {
  totalMembers: number;
  totalIncomes: number;
  totalExpenses: number;
  memberWithBalances: ClosingBalance[];
}
