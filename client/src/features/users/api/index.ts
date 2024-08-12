import type { AxiosResponse } from 'axios';
import axios from '@/lib/axios';
import type { ReturnedUser, UserFormValues } from '../types';

export async function createUser(values: UserFormValues) {
  const data: AxiosResponse<{ message: string; data: ReturnedUser }> =
    await axios.post('/api/users', values);
  return data;
}

export async function fetchUsers(searchQry?: string) {
  const url = searchQry ? `/api/users?search=${searchQry}` : '/api/users';
  const { data }: AxiosResponse<{ message: string; data: ReturnedUser[] }> =
    await axios.get(url);
  return data.data;
}
