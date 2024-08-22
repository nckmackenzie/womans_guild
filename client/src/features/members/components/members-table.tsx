import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/datatable';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CustomAlertDialog } from '@/components/ui/custom-alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteMember } from '@/features/members/api';
import type { Member, MemberShipStatus } from '@/features/members/types';
import { memberNoFormatter } from '@/features/members/utils/utils';
import { useDelete } from '@/hooks/use-delete';
import { dateFormatDistance } from '@/lib/formatters';
import { dummyArray } from '@/lib/utils';

export default function MembersTable({ data }: { data: Member[] }) {
  const { isPending, destroy } = useDelete('members', deleteMember);
  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: 'memberNo',
      header: 'Member No',
      cell: ({ row }) => (
        <div className="text-sm">
          {memberNoFormatter(row.getValue('memberNo'))}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Member Name',
      cell: ({ row }) => (
        <div className="text-sm uppercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'contact',
      header: 'Phone Number',
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue('contact')}</div>
      ),
    },
    {
      accessorKey: 'joiningDate',
      header: 'Membership Duration',
      cell: ({ row }) => (
        <div className="text-sm capitalize">
          {dateFormatDistance(row.getValue('joiningDate'), false)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as MemberShipStatus;
        return (
          <Badge
            variant={
              status === 'active'
                ? 'success'
                : status === 'inactive'
                ? 'secondary'
                : status === 'departed'
                ? 'warning'
                : 'error'
            }
            className="uppercase"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const member = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs [&>*]:font-medium">
              <DropdownMenuItem>
                <Link
                  to={`/transactions/members/edit/${member.id}`}
                  className="w-full"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <CustomAlertDialog
                onConfirm={() => destroy(member.id)}
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

export function MembersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Year Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyArray(10).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-52" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
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
