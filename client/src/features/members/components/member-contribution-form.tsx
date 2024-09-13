import { startTransition } from 'react';
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
import CustomSearchSelect from '@/components/ui/custom-search-select';
import { ErrorComponent } from '@/components/ui/basic-alert';
import FormFieldLoading from '@/components/ui/form-field-loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { MemberContributionValues } from '@/features/members/types';
import { useActiveYears } from '@/features/years/hooks/use-active-years';
import { memberContributionFormSchema } from '@/features/members/utils/schema';

import {
  checkYearContribution,
  createYearlyContribution,
} from '@/features/members/api';
import { useError } from '@/hooks/use-error';
import { useMutate } from '@/hooks/use-mutate';

export default function MemberContributionForm() {
  const { activeYears, isLoadingYears, yearsError } = useActiveYears();
  const { clearErrors, errors, onError } = useError();
  const { isPending, mutate } = useMutate(createYearlyContribution);
  const form = useForm<MemberContributionValues>({
    defaultValues: {
      amount: 0,
      yearId: '',
    },
    resolver: zodResolver(memberContributionFormSchema),
  });

  function onSubmit(values: MemberContributionValues) {
    clearErrors();
    mutate(values, {
      onSuccess: () => form.reset(),
      onError: error => onError(error.message.split('\n')),
    });
  }

  return (
    <div className="space-y-4">
      {(yearsError || errors) && (
        <ErrorComponent error={yearsError?.message || errors} />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isLoadingYears ? (
            <FormFieldLoading label="Financial Year" />
          ) : (
            <FormField
              control={form.control}
              name="yearId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Year</FormLabel>
                  <FormControl>
                    <CustomSearchSelect
                      options={activeYears}
                      value={field.value}
                      disabled={isPending}
                      onChange={(value: string) => {
                        field.onChange(value);
                        form.clearErrors('yearId');
                        startTransition(() => {
                          checkYearContribution(value)
                            .then(res => {
                              if (!res.success) {
                                form.setError('yearId', {
                                  type: 'manual',
                                  message: 'Year has already been used',
                                });
                              }
                            })
                            .catch(error => console.log(error));
                        });
                      }}
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
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    placeholder="0.00"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2">
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
            <Button
              variant="outline"
              type="reset"
              disabled={isPending}
              onClick={() => {
                form.reset();
                clearErrors();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
