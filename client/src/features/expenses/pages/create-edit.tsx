import ContentWrapper from '@/components/layout/content-wrapper';
import { BackButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExpenseForm from '@/features/expenses/components/expense-form';

export default function CreateEditExpense({ isEdit }: { isEdit?: boolean }) {
  return (
    <ContentWrapper title={isEdit ? 'Edit Expense' : 'Create Expense'}>
      <div className="space-y-4">
        <BackButton />
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>{isEdit ? 'Edit Expense' : 'Create Expense'}</CardTitle>
            <CardDescription>
              Provide expense information as accurately as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm />
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
