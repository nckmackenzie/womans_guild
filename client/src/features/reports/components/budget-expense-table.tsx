import { ColumnDef } from '@tanstack/react-table';

import type { BudgetExpenseReportItem } from '@/features/reports/types';
import { numberFormatter } from '@/lib/formatters';
import { DataTable } from '@/components/ui/datatable';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useExportExcel } from '@/hooks/use-excel';

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
];
export default function BudgetExpenseTable({
  data,
}: {
  data: BudgetExpenseReportItem[];
}) {
  const exportToExcel = useExportExcel();
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
              {numberFormatter(
                data.reduce((a, b) => a + Number(b.budgetedAmount), 0)
              )}
            </TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(
                data.reduce((a, b) => a + Number(b.expensedAmount), 0)
              )}
            </TableCell>
          </>
        }
      />
    </div>
  );
}
