import { ExpenseFormValues } from '@/features/expenses/types';
import { IncomeFormValues } from '@/features/incomes/types';
import { MemberFormValues } from '@/features/members/types';
import { MEMBER_STATUS } from '@/features/members/utils/utils';
import type { WithId, WithName } from '@/types';

export type MemberReportType = 'by-status' | 'by-registration';
export type ExpenseReportType = 'all' | 'by-votehead' | 'by-method';
export type IncomeReportType = 'all' | 'by-votehead';

export interface ReportType<T> {
  reportType: T | undefined;
}

export interface ReportDateRange {
  from?: string;
  to?: string;
}

export interface MemberReportDetails
  extends ReportType<MemberReportType>,
    ReportDateRange {
  status?: (typeof MEMBER_STATUS)[number]['value'];
}

export type MemberReportItem = MemberFormValues &
  WithId & {
    memberNo: number;
  };

export interface ExpenseReportDetails
  extends ReportType<ExpenseReportType>,
    Required<ReportDateRange> {
  params?: string;
}

export type ExpenseReportItem = Omit<
  ExpenseFormValues,
  'attachmentPath' | 'memberId' | 'voteheadId'
> & {
  voteheadName: string;
  memberName: string;
};

export interface IncomeReportParams
  extends ReportType<IncomeReportType>,
    Required<ReportDateRange> {
  votehead?: string;
}

export type IncomeReportItem = Omit<
  IncomeFormValues,
  'memberId' | 'voteheadId'
> & {
  memberName: string | null;
  voteheadName: string;
};

export type BudgetExpenseReportParams = {
  yearId: string;
};

export type BudgetExpenseReportItem = WithName & {
  budgetedAmount: number;
  expensedAmount: number;
};
