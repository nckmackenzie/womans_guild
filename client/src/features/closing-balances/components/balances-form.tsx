import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormFieldLoading from '@/components/ui/form-field-loading';
import { ErrorComponent } from '@/components/ui/basic-alert';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { closingBalanceFormSchema } from '@/features/closing-balances/schema';
import { useYears } from '@/features/years/hooks/use-years';
import {
  checkYear,
  createClosingBalances,
  getClosingBalances,
} from '@/features/closing-balances/api';
import { numberFormatter } from '@/lib/formatters';
import { useMutate } from '@/hooks/use-mutate';
import { useError } from '@/hooks/use-error';
import type { ClosingBalancesFormValues } from '@/features/closing-balances/types';

export default function BalancesForm() {
  const { isLoadingYears, years, yearsError } = useYears();
  const { isPending, mutate } = useMutate(createClosingBalances);
  const { clearErrors, errors, onError } = useError();
  const form = useForm<ClosingBalancesFormValues>({
    defaultValues: {
      details: [],
      yearId: '',
    },
    resolver: zodResolver(closingBalanceFormSchema),
  });

  function handleReset() {
    clearErrors();
    form.reset();
  }

  async function handleChange(value: string) {
    const year = await checkYear(value);

    if (year.data) {
      form.setError('yearId', {
        message: 'Closing Balances for selected year already entered.',
      });
      return;
    }

    const closingBalances = await getClosingBalances(value);
    const formatted = closingBalances.data
      .filter(b => b.status === 'active' && b.closingBalance !== 0)
      .map(b => ({
        memberId: b.id,
        memberName: b.name,
        previousBalance: b.balanceBf,
        yearContribution: b.yearContributions,
        amountPaid: b.totalContributions,
        balance: b.closingBalance,
      }));
    form.setValue('details', formatted);
    form.trigger('details');
  }

  return (
    <div className="space-y-4">
      {(yearsError || errors) && (
        <ErrorComponent error={yearsError?.message || errors} />
      )}
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values: ClosingBalancesFormValues) => {
            clearErrors();
            mutate(values, {
              onError: err => onError(err.message.split('\n')),
            });
            handleReset();
          })}
        >
          {isLoadingYears ? (
            <FormFieldLoading className="w-full" label="Year" />
          ) : (
            <FormField
              control={form.control}
              name="yearId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <CustomSearchSelect
                      value={field.value}
                      disabled={isPending}
                      onChange={(value: string) => {
                        field.onChange(value);
                        handleChange(value);
                      }}
                      options={years}
                      enableClear={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Balance Bf</TableHead>
                <TableHead>Year Target</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.getValues('details')?.map(closing => (
                <TableRow key={closing.memberId}>
                  <TableCell>{closing.memberName.toUpperCase()}</TableCell>
                  <TableCell>{numberFormatter(closing.balance)}</TableCell>
                  <TableCell>
                    {numberFormatter(closing.yearContribution)}
                  </TableCell>
                  <TableCell>{numberFormatter(closing.amountPaid)}</TableCell>
                  <TableCell>{numberFormatter(closing.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="space-x-2">
            <Button
              type="submit"
              disabled={form.watch('details')?.length === 0 || isPending}
            >
              Confirm
            </Button>
            <Button
              type="reset"
              disabled={isPending}
              variant="outline"
              onClick={handleReset}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
