import { MemberFormValues } from '@/features/members/types';
import { MEMBER_STATUS } from '@/features/members/utils/utils';
import { WithId } from '@/types';

export type MemberReportType = 'by-status' | 'by-registration';

export interface MemberReportDetails {
  reportType: MemberReportType | undefined;
  status?: (typeof MEMBER_STATUS)[number]['value'];
  from?: string;
  to?: string;
}

export type MemberReportItem = MemberFormValues &
  WithId & {
    memberNo: number;
  };
