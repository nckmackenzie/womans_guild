import { createId } from '@paralleldrive/cuid2';

import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { BackButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BudgetForm from '@/features/budgets/components/budget-form';

import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { useTitle } from '@/hooks/use-title';
import { dummyArray } from '@/lib/utils';
import type { IsEdit } from '@/types';

export default function CreateEditBudget({ isEdit }: IsEdit) {
  useTitle(isEdit ? 'Edit Budget' : 'Create Budget');
  const { error, isLoading, voteheads } = useFetchVoteheads('EXPENSE');
  const budgetItems = voteheads.map(vt => ({
    id: createId(),
    voteheadId: vt.value,
    voteheadName: vt.label,
    amount: 0,
    description: '',
  }));

  return (
    <ContentWrapper title={isEdit ? 'Edit Budget' : 'Create Budget'}>
      <div className="space-y-4">
        <BackButton />
        {error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Edit Budget' : 'Create Budget'}</CardTitle>
            <CardDescription>
              Provide budget information as accurately as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <BudgetForm isEdit={!!isEdit} budgetItems={budgetItems} />
            )}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Votehead Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyArray(10).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-52" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-52" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
