import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { CustomAlertDialog } from '@/components/ui/custom-alert-dialog';
import { DataTable } from '@/components/ui/datatable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { IncomeTableRow } from '@/features/incomes/types';
import { formatDateLong, numberFormatter } from '@/lib/formatters';
import { useDelete } from '@/hooks/use-delete';
import { deleteIncome } from '@/features/incomes/api';

interface IncomeDatatableProps {
  data: IncomeTableRow[];
}

export default function IncomeDatatable({ data }: IncomeDatatableProps) {
  const { destroy } = useDelete('incomes', deleteIncome);
  const columns: ColumnDef<IncomeTableRow>[] = [
    {
      accessorKey: 'date',
      header: 'Income Date',
      cell: ({ row }) => (
        <div className="row-font">{formatDateLong(row.getValue('date'))}</div>
      ),
    },
    {
      accessorKey: 'voteheadName',
      header: 'Votehead',
      cell: ({ row }) => (
        <div className="row-font">{row.getValue('voteheadName')}</div>
      ),
    },
    {
      accessorKey: 'memberName',
      header: 'Member Name',
      cell: ({ row }) => (
        <div className="row-font">{row.getValue('memberName')}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="row-font text-right">
          {numberFormatter(row.getValue('amount'))}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const income = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:font-medium [&>*]:text-xs">
              <DropdownMenuItem asChild>
                <Link
                  className="w-full"
                  to={`/transactions/incomes/edit/${income.id}`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <CustomAlertDialog onConfirm={() => destroy(income.id)}>
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
