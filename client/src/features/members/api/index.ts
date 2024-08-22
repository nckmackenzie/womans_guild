import axios from '@/lib/axios';
import type { MemberFormValues, Member } from '@/features/members/types';
import { handleMutationError, handleQueryError } from '@/lib/utils';

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

export async function fetchMemberNo(): Promise<{ data: number }> {
  try {
    const { data } = await axios.get('/api/members/memberNo');
    return data;
  } catch (error) {
    console.error('🔥🔥' + error);
    throw new Error('Something went wrong while fetching members.');
  }
}

export async function createMember(values: MemberFormValues) {
  try {
    await axios.post('/api/members', values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function fetchMember(
  id: string | undefined
): Promise<{ data: Member } | undefined> {
  if (!id) throw new Error('ID is required');
  try {
    const { data } = await axios(`/api/members/${id}`);

    return data;
  } catch (error) {
    handleQueryError(error);
  }
}

export async function updateMember(id: string, values: MemberFormValues) {
  try {
    await axios.patch(`/api/members/${id}`, values);
  } catch (error) {
    handleMutationError(error);
  }
}

export async function deleteMember(id: string) {
  try {
    await axios.delete(`/api/members/${id}`);
  } catch (error) {
    handleMutationError(error);
  }
}
