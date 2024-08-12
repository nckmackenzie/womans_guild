import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, Users } from 'lucide-react';
import { CreateNewButton } from '@/components/ui/button';
import { UsersTableSkeleton } from './skeletons';
import { DataTable } from '@/components/ui/datatable';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ErrorComponent } from '@/components/ui/basic-alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Search from '@/components/ui/search';

import { fetchUsers } from '../api';
import { ReturnedUser } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

export default function UsersBox() {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('search') ?? undefined;
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', queryString],
    queryFn: () => fetchUsers(queryString),
    refetchInterval: false,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <CreateNewButton href="/admin/users/new">
        <Users className="size-4 mr-2" /> <span>Create New User</span>
      </CreateNewButton>

      {error && <ErrorComponent error={error.message} />}

      {isLoading && <UsersTableSkeleton />}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              List of all created users.You can search a user from the input
              below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Search
              placeholder="Search by user name..."
              className="w-full md:w-72"
            />
            <UsersTable data={data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function UsersTable({ data }: { data: ReturnedUser[] }) {
  const columns: ColumnDef<ReturnedUser>[] = [
    {
      accessorKey: 'name',
      header: 'Full Name',
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'contact',
      header: 'Contact',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.getValue('role')}</div>
      ),
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => {
        const active = row.original.active;
        return (
          <Badge variant={active ? 'success' : 'error'}>
            {active ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:text-xs [&>*]:font-medium [&>*]:cursor-pointer">
              <DropdownMenuItem asChild>
                <Link to={`/admin/users/edit/${user.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Deactivate</DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
}
