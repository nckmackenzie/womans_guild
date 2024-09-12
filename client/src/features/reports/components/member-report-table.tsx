import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/datatable';

import type { MemberReportItem } from '@/features/reports/types';
import { memberNoFormatter } from '@/features/members/utils/utils';
import { useExportExcel } from '@/hooks/use-excel';

const columns: ColumnDef<MemberReportItem>[] = [
  {
    accessorKey: 'memberNo',
    header: 'Member No',
    cell: ({ row }) => (
      <div className="row-font">
        {memberNoFormatter(row.getValue('memberNo'))}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Member Name',
    cell: ({ row }) => <div className="row-font">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="row-font">{row.getValue('contact')}</div>
    ),
  },
  {
    accessorKey: 'idNumber',
    header: 'ID Number',
    cell: ({ row }) => (
      <div className="row-font">{row.getValue('idNumber')}</div>
    ),
  },
  {
    accessorKey: 'joiningDate',
    header: 'Joining Date',
    cell: ({ row }) => (
      <div className="row-font">{row.getValue('joiningDate')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="row-font">{row.getValue('status')}</div>,
  },
];

export default function MemberReportTable({
  data,
}: {
  data: MemberReportItem[];
}) {
  const exportToExcel = useExportExcel();
  return (
    <div className="space-y-4">
      <Button
        variant="excel"
        onClick={() =>
          exportToExcel(
            data.map(dt => ({
              ...dt,
              memberNo: memberNoFormatter(dt.memberNo),
            }))
          )
        }
      >
        Export to excel
      </Button>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
