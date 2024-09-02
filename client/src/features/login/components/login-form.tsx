import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { ErrorComponent } from '@/components/ui/basic-alert';

import { cn } from '@/lib/utils';
import { LoginFormValues } from '../types';
import { loginSchema } from '../utils/schema';
import { getCsrfToken } from '@/lib/auth';
import axios from '@/lib/axios';
import { ServerError } from '@/types';
import { useError } from '@/hooks/use-error';
import { flattenErrors } from '@/lib/formatters';

export default function LoginForm() {
  const navigate = useNavigate();
  const { errors, onError, clearErrors } = useError();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      contact: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { isPending, mutate: login } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      await getCsrfToken();
      await axios.post('/login', values);
      // console.log(data);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      if (isAxiosError(error)) {
        onError(flattenErrors(error.response?.data.errors as ServerError));
        return;
      }
      onError(error.message);
    },
  });

  async function onSubmit(values: LoginFormValues) {
    clearErrors();
    login(values);
  }

  return (
    <div className="h-full flex items-center justify-center mx-4 sm:mx-0">
      <div className="space-y-2">
        <img
          src="/logos/pcea-logo-128.png"
          alt="PCEA Logo"
          className="mx-auto size-16 sm:size-24"
        />
        <h1 className="text-xl sm:text-3xl font-bold text-center tracking-tight">
          PCEA Woman's Guild
        </h1>
        <p className="text-xs sm:text-base text-muted-foreground">
          Welcome Back! Enter your credentials to access your account!
        </p>
        {errors && <ErrorComponent error={errors} />}
        <Card className="w-full rounded border">
          <CardContent className="px-4 sm:px-6 py-4 md:py-6">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={10}
                          {...field}
                          placeholder="Enter phone number"
                          disabled={isPending}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/auth/forgot-password"
                          className={cn(
                            'text-sm underline underline-offset-4 hover:text-blue-800 font-medium',
                            isPending && 'pointer-events-none'
                          )}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Enter your password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full flex items-center gap-2"
                  disabled={isPending}
                >
                  {isPending && <Loader className="size-4 animate-spin" />} Sign
                  In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
