import axios from '@/lib/axios';
import type {
  MemberFormValues,
  Member,
  MemberShipType,
  MemberPromotionValues,
  MemberContributionValues,
} from '@/features/members/types';
import { handleMutationError, handleQueryError } from '@/lib/utils';
import { IdWithName } from '@/types';

export async function fetchMembers(
  queryString: string | undefined
): Promise<{ data: Member[] }> {
  const url = queryString ? `/api/members?${queryString}` : '/api/members';
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

export async function fetchActiveMembers(): Promise<{ data: IdWithName[] }> {
  try {
    const { data } = await axios.get('/api/members/activeMembers');

    return data;
  } catch (error) {
    console.error('🔥🔥' + error);
    throw new Error('Something went wrong while fetching members.');
  }
}

export async function fetchMembersByType(
  membershipType: MemberShipType
): Promise<{ data: IdWithName[] }> {
  try {
    const { data } = await axios.get(
      '/api/members?membershipType=' + membershipType
    );

    return data;
  } catch (error) {
    console.error('🔥🔥' + error);
    throw new Error('Something went wrong while fetching members.');
  }
}

export async function memberPromotion(values: MemberPromotionValues) {
  try {
    await axios.patch('/api/members/memberPromotion', values);
  } catch (error) {
    if (error instanceof Error) {
      console.error('🔥🔥' + error.message);
    }
    throw new Error('Something went wrong while fetching members.');
  }
}

export async function checkYearContribution(
  yearId: string
): Promise<{ success: boolean }> {
  try {
    const { data } = await axios.get(`/api/yearlyContributions/${yearId}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('🔥🔥' + error.message);
    }
    throw new Error('Something went wrong while fetching members.');
  }
}

export async function createYearlyContribution(
  values: MemberContributionValues
) {
  try {
    await axios.post('/api/yearlyContributions', values);
  } catch (error) {
    if (error instanceof Error) {
      console.error('🔥🔥' + error.message);
    }
    handleMutationError(error);
  }
}
