import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { MultiSelect, MultiSelectItem } from '@tremor/react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { MemberPromotionValues } from '@/features/members/types';
import { Input } from '@/components/ui/input';
import { ErrorComponent } from '@/components/ui/basic-alert';
import FormFieldLoading from '@/components/ui/form-field-loading';
import { Button } from '@/components/ui/button';

import { fetchMembersByType, memberPromotion } from '@/features/members/api';
import { dateFormat } from '@/lib/formatters';
import { memberPromotionSchema } from '@/features/members/utils/schema';
import { useMutate } from '@/hooks/use-mutate';
import { useError } from '@/hooks/use-error';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function PromotionForm() {
  const form = useForm<MemberPromotionValues>({
    defaultValues: {
      memberIds: [],
      promotionDate: new Date(),
    },
    resolver: zodResolver(memberPromotionSchema),
  });
  const { clearErrors, errors, onError } = useError();
  const { isLoading, data, error } = useQuery({
    queryKey: ['members', 'followers'],
    queryFn: () => fetchMembersByType('follower'),
  });

  const { isPending, mutate } = useMutate(memberPromotion, undefined, {
    queryKey: 'members',
  });

  function onSubmit(values: MemberPromotionValues) {
    clearErrors();
    mutate(
      {
        ...values,
        promotionDate: format(
          values.promotionDate,
          'yyyy-MM-dd'
        ) as unknown as Date,
      },
      {
        onSuccess: () => toast.success('Promotion successful!'),
        onError: err => onError(err.message.split('\n')),
      }
    );
  }

  return (
    <div className="space-y-4">
      {(error || errors) && <ErrorComponent error={error?.message || errors} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="promotionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotion Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? dateFormat(field.value) : ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <FormFieldLoading label="Members" className="w-full" />
          ) : (
            <FormField
              control={form.control}
              name="memberIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <MultiSelect
                      onValueChange={field.onChange}
                      disabled={isPending}
                      value={field.value}
                    >
                      {data?.data.map(member => (
                        <MultiSelectItem key={member.id} value={member.id}>
                          {member.name.toUpperCase()}
                        </MultiSelectItem>
                      ))}
                    </MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="space-x-2">
            <Button type="submit" disabled={isPending}>
              Promote
            </Button>
            <Button
              type="reset"
              variant="outline"
              onClick={() => {
                form.reset();
                clearErrors();
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
