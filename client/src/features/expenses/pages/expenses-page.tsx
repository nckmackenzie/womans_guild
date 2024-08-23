import { Banknote } from 'lucide-react';

import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ErrorComponent } from '@/components/ui/basic-alert';

import ExpenseFilter from '@/features/expenses/components/expense-filter';
import { useTitle } from '@/hooks/use-title';
import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchExpenses } from '@/features/expenses/api';

import ExpensesTable, {
  ExpensesTableSkeleton,
} from '@/features/expenses/components/expense-table';

export default function ExpensesPage() {
  useTitle('Expenses');
  const { data, error, isLoading } = usePageFetch('expenses', fetchExpenses);

  return (
    <ContentWrapper title="Expenses">
      <div className="space-y-4">
        <CreateNewButton href="/transactions/expenses/new">
          <Banknote className="icon mr-2" />
          <span>Create New Expense</span>
        </CreateNewButton>
        {error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>A list of all created expenses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ExpenseFilter />
            {isLoading ? (
              <ExpensesTableSkeleton />
            ) : (
              <ExpensesTable data={data ? data.data : []} />
            )}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
