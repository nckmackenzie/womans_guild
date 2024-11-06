import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';

import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import { DataTable } from '@/components/ui/datatable';
import FormFieldLoading from '@/components/ui/form-field-loading';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { toast } from 'sonner';

import { ClosingBalance } from '@/features/closing-balances/types';
import { fetchClosingBalances } from '@/features/reports/api/reports';
import { sendBalanceSMS } from '@/features/communication/api';
import type { Option } from '@/types';
import type { SmsItem } from '@/features/communication/types';

interface MemberBalancesProps {
  years: Option[];
  isLoadingYears: boolean;
}

export default function MemberBalances({
  isLoadingYears,
  years,
}: MemberBalancesProps) {
  const [selectedYear, setSelectedYear] = React.useState<string>();
  const [selectedMembers, setSelectedMembers] = React.useState<SmsItem[]>([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ['closing balances', selectedYear],
    queryFn: () => {
      if (!selectedYear) return;

      return fetchClosingBalances(selectedYear);
    },
    enabled: !!selectedYear,
  });

  const { isPending, mutate: send } = useMutation({
    mutationFn: sendBalanceSMS,
    onSuccess: data => {
      if (data?.status === 'success') {
        setSelectedYear(undefined);
        setSelectedMembers([]);
        toast.success('Messages sent successfully');
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedMembers.length)
      return toast.success('Please select at least one member');

    const formattedMembers = selectedMembers.map(m => ({
      ...m,
      name: m.name.split(' ')[0],
    }));
    // console.log(formattedMembers);
    const values = {
      recipients: formattedMembers,
    };
    send(values);
  }

  return (
    <div className="space-y-4">
      {error && <ErrorComponent error={error.message} />}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isLoadingYears ? (
          <FormFieldLoading className="w-full" label="Year" />
        ) : (
          <FormGroup>
            <Label>Financial Year</Label>
            <CustomSearchSelect
              options={years}
              onChange={(value: string) => setSelectedYear(value)}
              value={selectedYear}
              enableClear={false}
              disabled={isPending}
            />
          </FormGroup>
        )}
        {isLoading ? (
          <TableSkeleton rowCount={20} columnWidths={['w-8', 'w-56', 'w-24']} />
        ) : (
          <BalancesTable
            data={data?.data.filter(m => m.closingBalance > 0) || []}
            onSelectedMember={setSelectedMembers}
            isPending={isPending}
          />
        )}
        <Button type="submit" disabled={!selectedMembers.length || isPending}>
          Send To Selected ({selectedMembers.length})
        </Button>
      </form>
    </div>
  );
}

interface BalancesTableProps {
  data: ClosingBalance[];
  onSelectedMember: React.Dispatch<React.SetStateAction<SmsItem[]>>;
  isPending: boolean;
}

function BalancesTable({
  data,
  onSelectedMember,
  isPending,
}: BalancesTableProps) {
  const columns: ColumnDef<ClosingBalance>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          disabled={isPending}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => {
            if (value) {
              const selectedMembers: SmsItem[] = data.map(item => ({
                id: item.id,
                name: item.name.split(' ')[0],
                balance: item.closingBalance,
              }));
              onSelectedMember(selectedMembers);
            } else {
              onSelectedMember([]);
            }
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          disabled={isPending}
          checked={row.getIsSelected()}
          onCheckedChange={value => {
            onSelectedMember(prev => {
              if (value) {
                return [
                  ...prev,
                  {
                    id: row.original.id,
                    name: row.original.name,
                    balance: row.original.closingBalance,
                  },
                ];
              } else {
                return prev.filter(item => item.id !== row.original.id);
              }
            });
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Member Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },

    {
      accessorKey: 'closingBalance',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('closingBalance'));

        const formatted = new Intl.NumberFormat('en-KE', {
          style: 'currency',
          currency: 'KES',
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
  ];
  return <DataTable data={data} columns={columns} />;
}
