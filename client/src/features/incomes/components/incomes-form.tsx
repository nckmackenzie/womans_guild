import { useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormFieldLoading from '@/components/ui/form-field-loading';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';

import type { IncomeFormValues } from '@/features/incomes/types';
import type { IsEditRequired, WithId } from '@/types';
import { incomeFormSchema } from '@/features/incomes/schema';
import { dateFormat } from '@/lib/formatters';
import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { useMembers } from '@/features/members/hooks/use-members';
import { useMutate } from '@/hooks/use-mutate';
import { createIncome, updateIncome } from '@/features/incomes/api';
import { useError } from '@/hooks/use-error';

interface IncomesFormProps extends IsEditRequired {
  data?: IncomeFormValues & WithId;
}

export default function IncomesForm({ isEdit, data }: IncomesFormProps) {
  const { isLoading, error, voteheads } = useFetchVoteheads('INCOME');
  const { clearErrors, errors, onError } = useError();
  const { isLoadingMembers, error: membersError, members } = useMembers();
  const { isPending, mutate } = useMutate<IncomeFormValues>(
    createIncome,
    updateIncome,
    { queryKey: 'incomes', redirectPath: '/transactions/incomes' }
  );
  const form = useForm<IncomeFormValues>({
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: '',
      memberId: '',
      voteheadId: '',
    },
    resolver: zodResolver(incomeFormSchema),
  });

  useEffect(
    function () {
      if (data) {
        form.reset({
          amount: data.amount,
          date: data.date,
          description: data.description?.toUpperCase() || '',
          memberId: data.memberId || '',
          voteheadId: data.voteheadId,
        });
      }
    },
    [data, form]
  );

  function onSubmit(values: IncomeFormValues) {
    clearErrors();
    mutate(
      { ...values, date: dateFormat(values.date) as unknown as Date },
      { onError: error => onError(error.message.split('\n')) }
    );
  }

  return (
    <div className="space-y-4">
      {(error || membersError || errors) && (
        <ErrorComponent
          error={error?.message || membersError?.message || errors}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-grid">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="form-col">
                <FormLabel>Income Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    disabled={isPending}
                    {...field}
                    value={field.value ? dateFormat(field.value) : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <FormFieldLoading className="form-col" label="Income Votehead" />
          ) : (
            <FormField
              control={form.control}
              name="voteheadId"
              render={({ field }) => (
                <FormItem className="form-col">
                  <FormLabel>Income Votehead</FormLabel>
                  <FormControl>
                    <CustomSearchSelect
                      options={voteheads}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="form-col">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value !== 0 ? field.value : ''}
                    placeholder="eg 2000"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoadingMembers ? (
            <FormFieldLoading className="form-col" label="Member" />
          ) : (
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem className="form-col">
                  <FormLabel>
                    Member{' '}
                    <em className="text-xs">
                      (if income is submitted by member)
                    </em>
                  </FormLabel>
                  <CustomSearchSelect
                    options={members}
                    placeholder="Select member..."
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Optional..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Button
              type="submit"
              disabled={isPending || isLoading || isLoadingMembers}
            >
              {isEdit ? 'Update' : 'Submit'}
            </Button>
            <Button
              variant="outline"
              type="reset"
              onClick={() => form.reset()}
              disabled={isPending || isLoading || isLoadingMembers}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
