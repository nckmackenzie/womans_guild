import ContentWrapper from '@/components/layout/content-wrapper';
import { BackButton } from '@/components/ui/button';
import YearForm from '../components/year-form';

export default function NewYear() {
  return (
    <ContentWrapper title="Create Year">
      <div className="space-y-4 sm:space-y-6">
        <BackButton />
        <YearForm />
      </div>
    </ContentWrapper>
  );
}
