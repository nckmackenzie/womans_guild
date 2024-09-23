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
import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';

import { useTitle } from '@/hooks/use-title';
import type { IsEdit } from '@/types';

export default function CreateEditPage({ isEdit }: IsEdit) {
  useTitle(isEdit ? 'Edit Income Projection' : 'Create Income Projection');
  const { voteheads } = useFetchVoteheads('INCOME');
  return (
    <ContentWrapper
      title={isEdit ? 'Edit Income Projection' : 'Create Income Projection'}
    >
      <div className="space-y-4">
        <BackButton />
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
            <CreateEditForm isEdit={!!isEdit} voteheads={voteheads} />
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
