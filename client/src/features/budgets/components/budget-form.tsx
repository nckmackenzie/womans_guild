import { TableCell } from '@tremor/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { Label } from '@/components/ui/label';
import FormGroup from '@/components/ui/form-group';
import { Skeleton } from '@/components/ui/skeleton';

import type { BudgetFormValues, BudgetItem } from '@/features/budgets/types';
import type { IsEditRequired } from '@/types';
import { useActiveYears } from '@/features/years/hooks/use-active-years';
import { useMutate } from '@/hooks/use-mutate';
import { createBudget } from '@/features/budgets/api';
import { useError } from '@/hooks/use-error';
import { budgetFormSchema } from '@/features/budgets/schema';

interface BudgetFormProps extends IsEditRequired {
  budgetItems: BudgetItem[];
}

export default function BudgetForm({ isEdit, budgetItems }: BudgetFormProps) {
  const { isLoadingYears, activeYears, yearsError } = useActiveYears();
  const { clearErrors, errors, onError } = useError();
  const { mutate, isPending } = useMutate<BudgetFormValues>(
    createBudget,
    undefined,
    { queryKey: 'budgets', redirectPath: '/transactions/budgets' }
  );
  const form = useForm<BudgetFormValues>({
    defaultValues: {
      details: budgetItems,
    },
    resolver: zodResolver(budgetFormSchema),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'details',
  });

  function onSubmit(values: BudgetFormValues) {
    clearErrors();
    mutate(values, { onError: error => onError(error.message.split('\n')) });
  }

  return (
    <div className="space-y-4">
      {yearsError && <ErrorComponent error={yearsError.message} />}
      {errors && <ErrorComponent error={errors} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Budget Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="eg Budget 2024-2025"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isLoadingYears ? (
              <FormField
                control={form.control}
                name="yearId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Financial Year</FormLabel>
                    <FormControl>
                      <CustomSearchSelect
                        options={activeYears || []}
                        onChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormGroup className="flex-1">
                <Label>Financial Year</Label>
                <Skeleton className="h-10 w-full" />
              </FormGroup>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Votehead</TableHead>
                <TableHead className="w-52">Amount</TableHead>
                <TableHead className="w-96">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell className="text-sm uppercase">
                    {field.voteheadName}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...form.register(`details.${index}.amount` as const)}
                      //   name="amount"
                      //   id="amount"
                      //   value={item.amount}
                      //   onChange={e => handleChange(e, item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      disabled={isPending}
                      {...form.register(
                        `details.${index}.description` as const
                      )}
                      //   name="description"
                      //   id="description"
                      //   value={item.description}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="space-x-2">
            <Button disabled={isPending} type="submit">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button disabled={isPending} type="reset" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
