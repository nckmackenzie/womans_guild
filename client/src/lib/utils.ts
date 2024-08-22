import { QueryClient } from '@tanstack/react-query';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { flattenErrors } from './formatters';
import { isAxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const queryClient = new QueryClient();

export const dummyArray = (length: number) => {
  return Array.from({ length: length || 5 });
};

export const handleMutationError = (error: unknown) => {
  if (isAxiosError(error)) {
    const errors = flattenErrors(error.response?.data.errors).join('\n');
    console.error('Axios error:', error.response?.data || error.message);
    throw new Error(errors || 'An error occurred while creating the votehead.');
  } else {
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred.');
  }
};

export const handleQueryError = (error: unknown) => {
  if (isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || 'An error occurred while fetching data.'
    );
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error('An error occurred while fetching data.');
};
