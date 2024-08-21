import axios from '@/lib/axios';
import { type Member } from '@/features/members/types';

export async function fetchMembers(
  queryString: string | undefined
): Promise<{ data: Member[] }> {
  const url = queryString
    ? `/api/members?search=${queryString}`
    : '/api/members';
  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    console.error('🔥🔥' + error);
    throw new Error('Something went wrong while fetching members.');
  }
}
