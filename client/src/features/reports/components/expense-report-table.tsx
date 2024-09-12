import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/datatable';

import type { ExpenseReportItem } from '@/features/reports/types';
import { numberFormatter, reportDate } from '@/lib/formatters';
import { useExportExcel } from '@/hooks/use-excel';

const columns: ColumnDef<ExpenseReportItem>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div className="row-font">{reportDate(row.original.date)}</div>
    ),
  },
  {
    accessorKey: 'voteheadName',
    header: 'Votehead',
    cell: ({ row }) => (
      <div className="row-font">{row.original.voteheadName}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right">{numberFormatter(row.original.amount)}</div>
    ),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => (
      <div className="row-font">{row.original.paymentMethod}</div>
    ),
  },
  {
    accessorKey: 'paymentReference',
    header: 'Payment Reference',
    cell: ({ row }) => (
      <div className="row-font">{row.original.paymentReference}</div>
    ),
  },
  {
    accessorKey: 'memberName',
    header: 'Expensed To',
    cell: ({ row }) => (
      <div className="row-font">{row.original.memberName}</div>
    ),
  },
];

export default function ExpenseReportTable({
  data,
}: {
  data: ExpenseReportItem[];
}) {
  const total = data.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const exportToExcel = useExportExcel(`expenses_report_${Date.now()}`);

  return (
    <div className="space-y-4">
      <Button variant="excel" onClick={() => exportToExcel(data)}>
        Export To Excel
      </Button>
      <DataTable
        columns={columns}
        data={data}
        hasTotalsFooter
        footerColspan={2}
        footerTotalValue={numberFormatter(total)}
      />
    </div>
  );
}
