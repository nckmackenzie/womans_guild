import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/datatable';

import { numberFormatter } from '@/lib/formatters';
import { BudgetTableItem } from '@/features/budgets/types';

export default function BudgetsTable({ data }: { data: BudgetTableItem[] }) {
  const columns: ColumnDef<BudgetTableItem>[] = [
    {
      accessorKey: 'name',
      header: 'Budget Name',
      cell: ({ row }) => <div className="row-font">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'yearName',
      header: 'Year',
      cell: ({ row }) => (
        <div className="row-font">{row.getValue('yearName')}</div>
      ),
    },
    {
      accessorKey: 'totalAmount',
      header: () => <div className="text-right">Budget Total</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.getValue('totalAmount'))}
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} data={data} />;
}
