import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import Loader from '@/components/ui/loader';
import Error from '@/components/ui/error';

import { useError } from '@/hooks/use-error';
import { createUpdateVotehead, fetchVotehead } from '../api';
import { VoteheadFormSchema } from '../schema';
import { VOTEHEAD_TYPES } from '../utils';
import { type VoteheadFormValues } from '../votehead.types';

interface VoteheadFormProps {
  isEdit: boolean;
}

export default function VoteheadForm({ isEdit }: VoteheadFormProps) {
  const { clearErrors, errors, onError } = useError();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['votehead', id],
    queryFn: () => fetchVotehead(id),
    enabled: !!id,
    refetchInterval: false,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ values, id }: { values: VoteheadFormValues; id?: string }) =>
      createUpdateVotehead(values, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voteheads'] });
      navigate('/admin/voteheads');
    },
    onError: error => {
      onError(error.message?.split('\n'));
    },
  });

  const form = useForm<VoteheadFormValues>({
    defaultValues: {
      name: '',
      isActive: true,
    },
    resolver: zodResolver(VoteheadFormSchema),
  });

  useEffect(
    function () {
      if (data) {
        form.reset({
          isActive: !!data.data.isActive,
          name: data.data.name.toUpperCase(),
          voteheadType: 'INCOME',
        });
      }
    },
    [form, data]
  );

  function onSubmit(values: VoteheadFormValues) {
    clearErrors();
    console.log(values, id);
    mutate({ values, id });
  }

  if (isLoading) return <Loader />;

  if (!isLoading && error) {
    return <Error error={error.message} />;
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{!isEdit ? 'Create Votehead' : 'Edit Votehead'}</CardTitle>
        <CardDescription>Provide votehead information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {errors && <ErrorComponent error={errors} />}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votehead Name<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Votehead Name eg Catering"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voteheadType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votehead Type<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <CustomSearchSelect
                      options={VOTEHEAD_TYPES}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEdit && (
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Toggle votehead status"
                          aria-readonly
                          id="status"
                          disabled={isPending}
                        />
                        <Label htmlFor="status">
                          {form.getValues('isActive') ? 'Active' : 'Inactive'}
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <div className="space-x-2">
              <Button type="submit" disabled={isPending}>
                {isEdit ? 'Edit' : 'Save'}
              </Button>
              <Button type="reset" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
