import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { BackButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { MemberForm } from '@/features/members/components/member-form';

import { fetchMember } from '@/features/members/api';
import { useFetchSingle } from '@/hooks/use-fetch-single';
import { useTitle } from '@/hooks/use-title';

export interface MemberCreateEditProps {
  isEdit?: boolean;
}

export default function MemberCreateEdit({ isEdit }: MemberCreateEditProps) {
  useTitle(isEdit ? 'Edit Member' : 'Add Member');
  const { data, isLoading, error } = useFetchSingle('member', fetchMember);

  return (
    <ContentWrapper title={isEdit ? 'Edit Member' : 'Add Member'}>
      {isLoading ? (
        <Loader loadingText="Fetching member details..." />
      ) : (
        <div className="space-y-4">
          <BackButton />
          {!isLoading && error && <ErrorComponent error={error.message} />}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>{isEdit ? 'Edit Member' : 'Add Member'}</CardTitle>
              <CardDescription>
                Provide member information as accurately as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemberForm
                isEdit={!!isEdit}
                member={data?.data}
                memberNo={data?.data.memberNo || undefined}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </ContentWrapper>
  );
}
