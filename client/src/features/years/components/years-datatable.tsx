import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTable } from '@/components/ui/datatable';

import { dummyArray } from '@/lib/utils';
import { type Year } from '../types';
import { formatDateLong } from '@/lib/formatters';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function YearsDatatable({ data }: { data: Year[] }) {
  const columns: ColumnDef<Year>[] = [
    {
      accessorKey: 'name',
      header: 'Year Name',
      cell: ({ row }) => (
        <div className="text-sm uppercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDateLong(row.getValue('start_date'))}
        </div>
      ),
    },
    {
      accessorKey: 'end_date',
      header: 'End Date',
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDateLong(row.getValue('end_date'))}
        </div>
      ),
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => {
        const active = row.getValue('active');
        return (
          <Badge variant={active ? 'warning' : 'success'}>
            {active ? 'Closed' : 'Active'}
          </Badge>
        );
      },
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const year = row.original;
        if (year.is_closed) return null;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs [&>*]:font-medium">
              <DropdownMenuItem asChild>
                <Link to={`/admin/years/edit/${year.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
}

export function YearsTableSkeleton() {
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
