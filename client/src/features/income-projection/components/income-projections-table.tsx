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

import type { IncomeProjectionTableRow } from '@/features/income-projection/types';
import { numberFormatter } from '@/lib/formatters';
import { useDelete } from '@/hooks/use-delete';
import { deleteIncomeProjection } from '@/features/income-projection/api';

export default function IncomeProjectionsTable({
  data,
}: {
  data: IncomeProjectionTableRow[];
}) {
  const { destroy } = useDelete('income projections', deleteIncomeProjection);
  const columns: ColumnDef<IncomeProjectionTableRow>[] = [
    {
      accessorKey: 'yearName',
      header: 'Financial Year',
      cell: ({ row }) => (
        <div className="row-font">{row.original.yearName}</div>
      ),
    },
    {
      accessorKey: 'totalAmount',
      header: () => <div className="text-right">Total Amount</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.original.totalAmount)}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="more-btn">
              <MoreVertical className="icon-muted" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs [&>*]:font-medium">
            <DropdownMenuItem asChild>
              <Link
                to={`/transactions/income-projections/edit/${row.original.id}`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <CustomAlertDialog onConfirm={() => destroy(row.original.id)}>
              <button className="delete-menu-item">Delete</button>
            </CustomAlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return <DataTable columns={columns} data={data} />;
}
