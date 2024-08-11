import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import BasicSelect from '@/components/ui/basic-select';
import { Button } from '@/components/ui/button';

// import { userFormSchema } from '../utils/schema';
import { createUser } from '../../users/api';
// import { type UserFormValues } from './types';
import { userFormSchema } from '../utils/schema';
import { UserFormValues } from '../types';

export default function UserManagement() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-base sm:text-lg">Create User</CardTitle>
        <CardDescription>Provide user information.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  );
}

function UserForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      confirmPassword: '',
      contact: '',
      email: '',
      password: '',
      role: 'standard_user',
    },
    resolver: zodResolver(userFormSchema),
  });

  const { isPending, mutate: create } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/admin/users');
    },
  });

  function onSubmit(values: UserFormValues) {
    create(values);
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>
                Full Name<sup className="text-rose-500">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe...required"
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
                Contact<sup className="text-rose-500">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0722000000...required"
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
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="test@example.com...optional"
                  type="email"
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
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>
                Password<sup className="text-rose-500">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="password...required"
                  type="password"
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
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>
                Confirm Password<sup className="text-rose-500">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="confirm password...required"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <BasicSelect
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Select Role"
                  defaultValue={field.value}
                  disabled={isPending}
                  options={[
                    { label: 'Admin', value: 'admin' },
                    { label: 'Standard User', value: 'standard_user' },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex items-center gap-2">
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
          <Button
            type="reset"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
