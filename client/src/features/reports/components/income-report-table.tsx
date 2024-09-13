import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/datatable';

import type { IncomeReportItem } from '@/features/reports/types';
import { numberFormatter, reportDate } from '@/lib/formatters';
import { useExportExcel } from '@/hooks/use-excel';

const columns: ColumnDef<IncomeReportItem>[] = [
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
    accessorKey: 'memberName',
    header: 'Contributing Member',
    cell: ({ row }) => (
      <div className="row-font">{row.original.memberName ?? ''}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Payment Reference',
    cell: ({ row }) => (
      <div className="row-font">{row.original.description}</div>
    ),
  },
];

export default function IncomeReportTable({
  data,
}: {
  data: IncomeReportItem[];
}) {
  const total = data.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const exportToExcel = useExportExcel(`incomes_report_${Date.now()}`);

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
