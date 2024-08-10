import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

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

import { cn } from '@/lib/utils';
import { LoginFormValues } from '../types';
import { loginSchema } from '../utils/schema';

import { getCsrfToken } from '@/lib/auth';
import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      await getCsrfToken();
      await axios.post('/login', values);
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: error => {
      console.log(error.message);
    },
  });

  async function onSubmit(values: LoginFormValues) {
    mutate(values);
  }

  return (
    <div className="h-full flex items-center justify-center mx-4 sm:mx-0">
      <div className="space-y-2">
        <span
          role="img"
          aria-label="money bag"
          className="text-4xl block text-center"
        >
          💰
        </span>
        <h1 className="text-xl sm:text-3xl font-bold text-center tracking-tight">
          Welcome to ACME Finance
        </h1>
        <p className="text-xs sm:text-base text-muted-foreground">
          Welcome Back! Enter your credentials to access your account!
        </p>
        <Card className="w-full rounded border">
          <CardContent className="px-4 sm:px-6 py-4 md:py-6">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter phone number"
                          disabled={isPending}
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
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type="password"
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
