import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { BackButton, Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CustomSearchSelect from '@/components/ui/custom-search-select';
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
import Loader from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';

import { fetchMember } from '@/features/members/api';
import { useFetchMemberNo } from '@/features/members/hooks/use-fetch-member-no';
import type { Member, MemberFormValues } from '@/features/members/types';
import { membersFormSchema } from '@/features/members/utils/schema';
import {
  MEMBER_STATUS,
  memberNoFormatter,
} from '@/features/members/utils/utils';
import { useError } from '@/hooks/use-error';
import { useFetchSingle } from '@/hooks/use-fetch-single';
import { useTitle } from '@/hooks/use-title';
import { useMutateMember } from '@/features/members/hooks/use-member-mutate';

interface MemberCreateEditProps {
  isEdit?: boolean;
}

export default function MemberCreateEdit({ isEdit }: MemberCreateEditProps) {
  useTitle(isEdit ? 'Edit Member' : 'Add Member');
  const { data, isLoading, error } = useFetchSingle('member', fetchMember);

  return (
    <ContentWrapper title={isEdit ? 'Edit Member' : 'Add Member'}>
      {isLoading ? (
        <Loader loadingText="Fetching member details..." />
      ) : (
        <div className="space-y-4">
          <BackButton />
          {!isLoading && error && <ErrorComponent error={error.message} />}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>{isEdit ? 'Edit Member' : 'Add Member'}</CardTitle>
              <CardDescription>
                Provide member information as accurately as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemberForm
                isEdit={!!isEdit}
                member={data?.data}
                memberNo={data?.data.memberNo || undefined}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </ContentWrapper>
  );
}

interface MemberFormProps extends MemberCreateEditProps {
  member?: Member;
  memberNo: number | undefined;
}

function MemberForm({ isEdit, member, memberNo }: MemberFormProps) {
  const { data, error, isLoading } = useFetchMemberNo(!!isEdit);

  const { clearErrors, errors, onError } = useError();
  const form = useForm<MemberFormValues>({
    defaultValues: {
      contact: '',
      idNumber: '',
      name: '',
      status: 'active',
    },
    resolver: zodResolver(membersFormSchema),
  });

  const { isPending, mutate } = useMutateMember();

  useEffect(
    function () {
      if (member) {
        form.reset({
          ...member,
          name: member.name.toUpperCase(),
          idNumber: member.idNumber ?? undefined,
          birthDate: member.birthDate || undefined,
        });
      }
    },
    [form, member]
  );

  function onSubmit(values: MemberFormValues) {
    clearErrors();
    mutate(values, { onError: error => onError(error.message.split('\n')) });
  }

  return (
    <>
      {errors && <ErrorComponent error={errors} />}
      {error && <ErrorComponent error={error.message} />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          <MemberNo isLoading={isLoading} data={data} memberNo={memberNo} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Member Name <sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="eg Jane Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>
                  Member Phone No <sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="eg 0722000000"
                    maxLength={10}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="eg 1111111"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Joining Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    type="date"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    type="date"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Member Status</FormLabel>
                <FormControl>
                  <CustomSearchSelect
                    options={MEMBER_STATUS}
                    value={field.value}
                    onChange={field.onChange}
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
            <Button type="reset" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

function MemberNo({
  isLoading,
  data,
  memberNo,
}: {
  isLoading: boolean;
  data: { data: number } | undefined;
  memberNo: number | undefined;
}) {
  if (isLoading) {
    return (
      <div className="space-y-2 col-span-full lg:col-span-6">
        <Label>Member No</Label>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }
  return (
    <div className="space-y-2 col-span-full lg:col-span-6">
      <Label>Member No</Label>
      <Input
        className="w-full"
        readOnly
        value={
          data?.data
            ? memberNoFormatter(data.data)
            : memberNo
            ? memberNoFormatter(memberNo)
            : ''
        }
      />
    </div>
  );
}
