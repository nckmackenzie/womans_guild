import axios from '@/lib/axios';
import { handleQueryError } from '@/lib/utils';
import { DashboardCardsData } from '../types';

export async function fetchDashboardData(): Promise<
  { data: DashboardCardsData } | undefined
> {
  try {
    const { data } = await axios.get('/api/dashboard');
    return data;
  } catch (error) {
    handleQueryError(error);
  }
}
