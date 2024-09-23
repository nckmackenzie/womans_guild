import { useEffect } from 'react';
import { createId } from '@paralleldrive/cuid2';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorComponent } from '@/components/ui/basic-alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormFieldLoading from '@/components/ui/form-field-loading';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useYears } from '@/features/years/hooks/use-years';
import type { IsEditRequired, Option } from '@/types';
import { incomeProjectionsSchema } from '@/features/income-projection/schema';
import type { IncomeProjectionsFormValues } from '@/features/income-projection/types';
import { useMutate } from '@/hooks/use-mutate';
import { createIncomeProjection } from '@/features/income-projection/api';
import { useError } from '@/hooks/use-error';

interface CreateEditFormProps extends IsEditRequired {
  voteheads: Option[];
}
export default function CreateEditForm({
  isEdit,
  voteheads,
}: CreateEditFormProps) {
  const { isLoadingYears, years, yearsError } = useYears();
  const { clearErrors, errors, onError } = useError();

  const { isPending, mutate } = useMutate(createIncomeProjection, undefined, {
    queryKey: 'income-projections',
    redirectPath: '/transactions/income-projections',
  });
  const form = useForm<IncomeProjectionsFormValues>({
    defaultValues: {
      yearId: '',
      details: voteheads
        ? voteheads.map(votehead => ({
            id: createId(),
            votehead: votehead.label,
            voteheadId: votehead.value,
            amount: 0,
          }))
        : [],
    },
    resolver: zodResolver(incomeProjectionsSchema),
  });

  useEffect(() => {
    if (voteheads && voteheads.length > 0) {
      form.reset({
        yearId: form.getValues('yearId'),
        details: voteheads.map(votehead => ({
          id: createId(),
          votehead: votehead.label,
          voteheadId: votehead.value,
          amount: 0,
        })),
      });
    }
  }, [voteheads, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: 'details',
  });

  function onSubmit(values: IncomeProjectionsFormValues) {
    clearErrors();
    mutate(values, { onError: err => onError(err.message.split('\n')) });
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
                      options={years}
                      onChange={field.onChange}
                      value={field.value}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {fields.map((field, index) => (
            <div className="form-grid p-4 bg-secondary" key={field.id}>
              <FormGroup className="col-span-full md:col-span-9">
                <Label>VoteHead</Label>
                <div className="input uppercase">{field.votehead}</div>
              </FormGroup>
              <FormGroup className="col-span-full md:col-span-3">
                <Label>Amount</Label>
                <div>
                  <Input
                    type="number"
                    disabled={isPending}
                    {...form.register(`details.${index}.amount`)}
                  />
                </div>
              </FormGroup>
            </div>
          ))}
          <div className="space-x-2">
            <Button type="submit" disabled={isPending}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button type="reset" variant={'outline'} disabled={isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
