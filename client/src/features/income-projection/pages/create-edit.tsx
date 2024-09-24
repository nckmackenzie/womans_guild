import ContentWrapper from '@/components/layout/content-wrapper';
import { BackButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateEditForm from '@/features/income-projection/components/create-edit-form';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { PageLoader } from '@/components/ui/loader';

import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { useFetchSingle } from '@/hooks/use-fetch-single';
import { useTitle } from '@/hooks/use-title';
import type { IsEdit } from '@/types';
import { fetchIncomeProjection } from '@/features/income-projection/api';

export default function CreateEditPage({ isEdit }: IsEdit) {
  useTitle(isEdit ? 'Edit Income Projection' : 'Create Income Projection');
  const { voteheads } = useFetchVoteheads('INCOME');
  const { data, error, isLoading } = useFetchSingle(
    'income-projection',
    fetchIncomeProjection
  );

  if (isLoading)
    return <PageLoader loadingText="Fetching income projection details..." />;

  return (
    <ContentWrapper
      title={isEdit ? 'Edit Income Projection' : 'Create Income Projection'}
    >
      <div className="space-y-4">
        <BackButton />
        {error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>
              {isEdit ? 'Edit Income Projection' : 'Create Income Projection'}
            </CardTitle>
            <CardDescription>
              Provide income projection information as accurately as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateEditForm
              isEdit={!!isEdit}
              voteheads={voteheads}
              data={data?.data}
            />
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
