import { QueryClient } from '@tanstack/react-query';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { flattenErrors } from './formatters';
import { isAxiosError } from 'axios';

export function getInitials(fullName: string | null): string {
  if (!fullName) return 'U';

  const names = fullName.trim().split(/\s+/);
  if (names.length === 1) {
    return names[0][0].toUpperCase();
  } else if (names.length === 2) {
    return names.map(name => name[0].toUpperCase()).join('');
  } else {
    return `${names[0][0].toUpperCase()}${names[
      names.length - 1
    ][0].toUpperCase()}`;
  }
}

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
    const errors = error.response?.data.errors
      ? flattenErrors(error.response?.data.errors).join('\n')
      : error.response?.data.message;
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
