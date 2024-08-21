import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';

import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useError } from '@/hooks/use-error';
import { createYear, fetchYear } from '../api';
import { yearFormSchema } from '../schema';
import type { YearFormValues } from '../types';

export default function YearForm() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { clearErrors, errors, onError } = useError();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['year', id],
    queryFn: () => fetchYear(id as string),
    enabled: !!id,
    refetchInterval: false,
  });

  const form = useForm<YearFormValues>({
    defaultValues: {
      name: '',
      startDate: undefined,
      endDate: undefined,
    },
    resolver: zodResolver(yearFormSchema),
  });

  const queryClient = useQueryClient();

  useEffect(
    function () {
      if (data) {
        form.reset({
          name: data.data.name,
          startDate: new Date(data.data.startDate),
          endDate: new Date(data.data.endDate),
        });
      }
    },
    [form, data]
  );

  const { isPending, mutate: create } = useMutation({
    mutationFn: ({ values, id }: { values: YearFormValues; id?: string }) =>
      createYear(values, id),
    onSuccess: () => {
      navigate('/admin/years');
      queryClient.invalidateQueries({ queryKey: ['years'] });
    },
    onError: error => {
      onError(error.message.split('\n'));
    },
  });

  function onSubmit(values: YearFormValues) {
    clearErrors();
    create({ values, id });
  }

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center text-primary">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Year</CardTitle>
        <CardDescription>Provide financial year information.</CardDescription>
      </CardHeader>
      <CardContent>
        {errors && <ErrorComponent error={errors} />}
        {error && <ErrorComponent error={errors || error.message} />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-12 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Year Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year 2023-2024"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-6">
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="date"
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-6">
                  <FormLabel>End Date</FormLabel>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="date"
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
              <Button
                variant="outline"
                type="reset"
                disabled={isPending}
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
