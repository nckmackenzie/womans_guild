import { Option } from '@/types';

export function memberNoFormatter(memberNo: number) {
  return `SP/WG/${memberNo.toString().padStart(4, '0')}`;
}

export const MEMBER_STATUS: Option[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'departed', label: 'Departed' },
  { value: 'deceased', label: 'Deceased' },
];
