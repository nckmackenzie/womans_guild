import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { toast } from 'sonner';

import type { ChangePasswordFormValues } from '@/features/global/types';
import { changePasswordFormSchema } from '@/features/global/schema';
import { useError } from '@/hooks/use-error';
import { useMutate } from '@/hooks/use-mutate';
import { changePassword } from '@/features/global/api';

export default function ChangePasswordForm() {
  const { clearErrors, errors, onError } = useError();
  const { isPending, mutate } = useMutate(changePassword);
  const form = useForm<ChangePasswordFormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: '',
    },
    resolver: zodResolver(changePasswordFormSchema),
  });

  function onSubmit(values: ChangePasswordFormValues) {
    clearErrors();
    mutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success('Password changed successfully');
      },
      onError: error => onError(error.message.split('\n')),
    });
  }
  return (
    <div className="space-y-4">
      {errors && <ErrorComponent error={errors} />}
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
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Your old password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Your new password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Confirm new password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2">
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
                <Button
                  disabled={isPending}
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    clearErrors();
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
