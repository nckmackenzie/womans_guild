import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { forgotPassword } from '@/features/change-password/api';
import { useNavigate } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  contact: z
    .string()
    .min(10, 'Invalid phone number')
    .max(10, 'Invalid phone number'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: data => {
      form.reset();
      navigate('/reset-password?token=' + data?.token);
    },
    onError: error => {
      form.setError('root', { message: error.message });
    },
  });
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { contact: '' },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    formState: { errors: formErrors },
  } = form;

  async function onSubmit(values: ForgotPasswordFormValues) {
    mutate(values);
    form.setError('root', { message: 'This number is not registered' });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    maxLength={10}
                    {...field}
                    placeholder="Enter phone number that was registered"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formErrors.root && (
            <p className="text-sm text-destructive font-medium">
              {formErrors.root.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
