import { DataTable } from '@/components/ui/datatable';
import { TableCell } from '@/components/ui/table';
import { ClosingBalance } from '@/features/closing-balances/types';
import { numberFormatter } from '@/lib/formatters';
import { ColumnDef } from '@tanstack/react-table';

interface ContributionsTableProps {
  data: ClosingBalance[];
}

function ContributionsTable({ data }: ContributionsTableProps) {
  const columns: ColumnDef<ClosingBalance>[] = [
    {
      accessorKey: 'name',
      header: 'Member Name',
      cell: ({ row }) => <div>{row.original.name.toUpperCase()}</div>,
    },
    {
      accessorKey: 'balanceBf',
      header: () => <div className="text-right">Balance B/F</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.original.balanceBf)}
        </div>
      ),
    },
    {
      accessorKey: 'yearContributions',
      header: () => <div className="text-right">Year Contribution</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.original.yearContributions)}
        </div>
      ),
    },
    {
      accessorKey: 'totalContributions',
      header: () => <div className="text-right">Total Paid</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.original.totalContributions)}
        </div>
      ),
    },
    {
      accessorKey: 'closingBalance',
      header: () => <div className="text-right">Closing Balance</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormatter(row.original.closingBalance)}
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        hasTotalsFooter
        customFooter={
          <>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(data.reduce((a, b) => a + b.balanceBf, 0))}
            </TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(
                data.reduce((a, b) => a + b.yearContributions, 0)
              )}
            </TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(
                data.reduce((a, b) => a + b.totalContributions, 0)
              )}
            </TableCell>
            <TableCell className="text-right text-bold">
              {numberFormatter(data.reduce((a, b) => a + b.closingBalance, 0))}
            </TableCell>
          </>
        }
      />
    </div>
  );
}

export default ContributionsTable;
