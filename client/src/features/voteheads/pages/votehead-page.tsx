import type { ColumnDef } from '@tanstack/react-table';
import { ChartCandlestick, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { CreateNewButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Search from '@/components/ui/search';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchVoteheads } from '../api';
import { type Votehead } from '../votehead.types';
import { useTitle } from '@/hooks/use-title';
import { dummyArray } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function VoteheadPage() {
  useTitle('Voteheads');

  // const [searchParams] = useSearchParams();
  // const queryString = searchParams.get('search') ?? undefined;

  const { data, error, isLoading } = usePageFetch('voteheads', fetchVoteheads);

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['voteheads', queryString],
  //   queryFn: () => fetchVoteheads(queryString),
  //   refetchInterval: false,
  // });

  return (
    <ContentWrapper title="Voteheads">
      <div className="space-y-4">
        <CreateNewButton href="/admin/voteheads/new">
          <ChartCandlestick className="size-4 mr-2" />
          <span>Create New Votehead</span>
        </CreateNewButton>
        {!isLoading && error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>Voteheads</CardTitle>
            <CardDescription>A list of all created voteheads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Search
              placeholder="Search by votehead name"
              className="w-full md:w-72"
            />
            {isLoading && <VoteheadTableSkeleton />}
            {data && <VoteheadsDatatable data={data.data} />}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}

function VoteheadTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Votehead Name</TableHead>
          <TableHead>Votehead Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyArray(10).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="w-32 h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-16 h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-16 h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-2 h-4" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function VoteheadsDatatable({ data }: { data: Votehead[] }) {
  const columns: ColumnDef<Votehead>[] = [
    {
      accessorKey: 'name',
      header: 'Votehead Name',
      cell: ({ row }) => (
        <div className="text-xs uppercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'voteheadType',
      header: 'Votehead Type',
      cell: ({ row }) => (
        <div className="text-xs uppercase">{row.getValue('voteheadType')}</div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = Boolean(row.getValue('isActive'));
        return (
          <Badge variant={isActive ? 'success' : 'error'}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const votehead = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:text-xs [&>*]:font-medium [&>*]:cursor-pointer">
              <DropdownMenuItem asChild>
                <Link to={`/admin/voteheads/edit/${votehead.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
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
