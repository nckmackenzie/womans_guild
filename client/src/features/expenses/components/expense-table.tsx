import type { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/ui/datatable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dummyArray } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomAlertDialog } from '@/components/ui/custom-alert-dialog';

import type { Expense } from '@/features/expenses/types';
import { formatDateLong, numberFormatter } from '@/lib/formatters';
import { useDelete } from '@/hooks/use-delete';
import { deleteExpense } from '@/features/expenses/api';

export default function ExpenseTable({ data }: { data: Expense[] }) {
  const { isPending, destroy } = useDelete('expenses', deleteExpense);
  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="text-sm">{formatDateLong(row.getValue('date'))}</div>
      ),
    },
    {
      accessorKey: 'votehead',
      header: 'Votehead',
      cell: ({ row }) => {
        const votehead = row.original.votehead.name;
        return <div className="text-sm uppercase">{votehead}</div>;
      },
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-center">Amount</div>,
      cell: ({ row }) => (
        <div className="text-sm text-center">
          {numberFormatter(row.getValue('amount'))}
        </div>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment Method',
      cell: ({ row }) => (
        <div className="text-sm uppercase">{row.getValue('paymentMethod')}</div>
      ),
    },
    {
      accessorKey: 'paymentReference',
      header: 'Payment Reference',
      cell: ({ row }) => (
        <div className="text-sm uppercase">
          {row.getValue('paymentReference')}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const expense = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs">
              <DropdownMenuItem asChild>
                <Link
                  to={`/transactions/expenses/edit/${expense.id}`}
                  className="w-full"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <CustomAlertDialog
                onConfirm={() => destroy(expense.id)}
                isPending={isPending}
              >
                <button className="delete-menu-item">Delete</button>
              </CustomAlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
}

export function ExpensesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Votehead</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment method</TableHead>
          <TableHead>Payment Reference</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyArray(10).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-2" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
