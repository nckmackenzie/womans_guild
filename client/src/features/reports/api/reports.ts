import axios from '@/lib/axios';

import type {
  MemberReportItem,
  ExpenseReportItem,
  IncomeReportItem,
  BudgetExpenseReportItem,
} from '@/features/reports/types';

export async function fetchMembersReport(
  query?: string
): Promise<{ data: MemberReportItem[] }> {
  try {
    const { data } = await axios(`/api/reports/members?${query}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    throw new Error('Something went wrong while fetching members report');
  }
}

export async function fetchExpenseReport(
  query?: string
): Promise<{ data: ExpenseReportItem[] }> {
  try {
    const { data } = await axios(`/api/reports/expenses?${query}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    throw new Error('Something went wrong while fetching expenses report');
  }
}

export async function fetchIncomeReport(
  query?: string
): Promise<{ data: IncomeReportItem[] }> {
  try {
    const { data } = await axios(`/api/reports/incomes?${query}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    throw new Error('Something went wrong while fetching incomes report');
  }
}

export async function fetchBudgetExpenseReport(
  query?: string
): Promise<{ data: BudgetExpenseReportItem[] }> {
  try {
    const { data } = await axios(`/api/reports/budgetExpense?${query}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    throw new Error('Something went wrong while fetching report');
  }
}
