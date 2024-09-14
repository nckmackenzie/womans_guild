import { ColumnDef } from '@tanstack/react-table';

import type { BudgetExpenseReportItem } from '@/features/reports/types';
import { numberFormatter } from '@/lib/formatters';
import { DataTable } from '@/components/ui/datatable';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useExportExcel } from '@/hooks/use-excel';
import { cn } from '@/lib/utils';

const columns: ColumnDef<BudgetExpenseReportItem>[] = [
  {
    accessorKey: 'name',
    header: 'Votehead',
    cell: ({ row }) => <div className="row-font">{row.original.name}</div>,
  },
  {
    accessorKey: 'budgetedAmount',
    header: () => <div className="row-font text-right">Budgeted Amounted</div>,
    cell: ({ row }) => (
      <div className="row-font text-right">
        {numberFormatter(row.original.budgetedAmount)}
      </div>
    ),
  },
  {
    accessorKey: 'expensedAmount',
    header: () => <div className="row-font text-right">Expensed Amounted</div>,
    cell: ({ row }) => (
      <div className="row-font text-right">
        {numberFormatter(row.original.expensedAmount)}
      </div>
    ),
  },
  {
    id: 'variance',
    header: () => <div className="row-font text-right">Balance</div>,
    cell: ({ row }) => {
      const variance =
        row.original.budgetedAmount - row.original.expensedAmount;
      return (
        <div
          className={cn(
            'row-font text-right font-semibold',
            variance < 0 ? 'text-red-500' : 'text-green-500'
          )}
        >
          {numberFormatter(variance)}
        </div>
      );
    },
  },
];
export default function BudgetExpenseTable({
  data,
}: {
  data: BudgetExpenseReportItem[];
}) {
  const exportToExcel = useExportExcel();
  const totalBudgeted = data.reduce((a, b) => a + Number(b.budgetedAmount), 0);
  const totalExpensed = data.reduce((a, b) => a + Number(b.expensedAmount), 0);
  const totalVariance = totalBudgeted - totalExpensed;
  return (
    <div className="space-y-4">
      <Button variant="excel" onClick={() => exportToExcel(data)}>
        Export to Excel
      </Button>
      <DataTable
        columns={columns}
        data={data}
        hasTotalsFooter
        customFooter={
          <>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(totalBudgeted)}
            </TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(totalExpensed)}
            </TableCell>
            <TableCell
              className={cn(
                'text-right text-bold',
                totalVariance < 0 ? 'text-red-500' : 'text-green-500'
              )}
            >
              {numberFormatter(totalVariance)}
            </TableCell>
          </>
        }
      />
    </div>
  );
}
