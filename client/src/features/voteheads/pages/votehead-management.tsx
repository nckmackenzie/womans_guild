import ContentWrapper from '@/components/layout/content-wrapper';
import VoteheadForm from '../components/votehead-form';

import { BackButton } from '@/components/ui/button';
import { useTitle } from '@/hooks/use-title';

export default function VoteheadManagement({ isEdit }: { isEdit?: boolean }) {
  useTitle(!isEdit ? 'Create Votehead' : 'Edit Votehead');
  return (
    <ContentWrapper title={!isEdit ? 'Create Votehead' : 'Edit Votehead'}>
      <BackButton />
      <VoteheadForm isEdit={!!isEdit} />
    </ContentWrapper>
  );
}
