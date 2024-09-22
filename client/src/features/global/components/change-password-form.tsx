import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';

import type { ChangePasswordFormValues } from '@/features/global/types';
import { changePasswordFormSchema } from '@/features/global/schema';

export default function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: '',
    },
    resolver: zodResolver(changePasswordFormSchema),
  });

  function onSubmit(values: ChangePasswordFormValues) {}
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Enter your old password and new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="oldPassword" />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
