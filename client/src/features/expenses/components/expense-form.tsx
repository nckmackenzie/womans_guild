import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import { ErrorComponent } from '@/components/ui/basic-alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/ui/loader';

import { useError } from '@/hooks/use-error';
import type { IsEdit } from '@/types';
import type { ExpenseFormValues } from '@/features/expenses/types';
import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { PAYMENT_METHODS } from '@/features/expenses/utils';
import { useMembers } from '@/features/members/hooks/use-members';
import { expensesFormSchema } from '@/features/expenses/schema';
import { useMutate } from '@/hooks/use-mutate';
import {
  createExpense,
  fetchExpense,
  updateExpense,
} from '@/features/expenses/api';
import { useFetchSingle } from '@/hooks/use-fetch-single';

export default function ExpenseForm({ isEdit }: IsEdit) {
  const { clearErrors, errors, onError } = useError();

  const {
    data: expense,
    error: expenseFetchError,
    isLoading: isLoadingExpense,
  } = useFetchSingle('expense', fetchExpense);

  const { isPending, mutate } = useMutate<ExpenseFormValues>(
    createExpense,
    updateExpense,
    { queryKey: 'expenses', redirectPath: '/transactions/expenses' }
  );
  const { isLoading, voteheads, error } = useFetchVoteheads('EXPENSE');
  const { isLoadingMembers, members } = useMembers();
  const form = useForm<ExpenseFormValues>({
    defaultValues: {
      description: '',
      memberId: '',
      attachmentPath: '',
      reference: '',
      voteheadId: '',
      paymentMethod: 'cash',
      paymentReference: '',
      amount: 0,
    },
    resolver: zodResolver(expensesFormSchema),
  });

  useEffect(
    function () {
      if (expense) {
        form.reset({
          ...expense.data,
          paymentReference: expense.data.paymentReference.toUpperCase(),
          description: expense.data?.description?.toUpperCase(),
          reference: expense.data?.reference?.toUpperCase(),
          memberId: expense.data.memberId ?? undefined,
          attachmentPath: expense.data.attachmentPath ?? undefined,
        });
      }
    },
    [form, expense]
  );

  function onSubmit(values: ExpenseFormValues) {
    clearErrors();
    mutate(values, {
      onSuccess: () => {},
      onError: error => onError(error.message.split('\n')),
    });
  }

  if (isLoadingExpense) return <PageLoader />;

  return (
    <div className="space-y-4">
      {(errors || error || expenseFetchError) && (
        <ErrorComponent
          error={errors || error?.message || expenseFetchError?.message}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Expense Date <sup className="text-rose-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voteheadId"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Expense Votehead <sup className="text-rose-500">*</sup>
                </FormLabel>
                <FormControl>
                  {!isLoading ? (
                    <CustomSearchSelect
                      options={voteheads}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  ) : (
                    <Skeleton className="w-full h-10" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Expense Amount <sup className="text-rose-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value == 0 ? '' : field.value}
                    placeholder="eg 1200"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Payment Method <sup className="text-rose-500">*</sup>
                </FormLabel>
                <FormControl>
                  <CustomSearchSelect
                    options={PAYMENT_METHODS}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentReference"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Payment Reference <sup className="text-rose-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value}
                    placeholder="eg XS12345678O"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Voucher/Invoice No</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value}
                    placeholder="eg 123456"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Expensed To</FormLabel>
                <FormControl>
                  {!isLoadingMembers ? (
                    <CustomSearchSelect
                      options={members || []}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  ) : (
                    <Skeleton className="w-full h-10" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="eg Monthly salary"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-full space-x-2">
            <Button type="submit" disabled={isPending}>
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              type="reset"
              disabled={isPending}
              onClick={() => form.reset()}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
