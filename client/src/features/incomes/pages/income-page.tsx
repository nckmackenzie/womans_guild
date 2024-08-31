import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

export default function IncomePage() {
  return (
    <ContentWrapper title="Incomes">
      <div className="space-y-4">
        <CreateNewButton href="new">
          <DollarSign className="icon mr-2" />
          <span>Create new income</span>
        </CreateNewButton>
      </div>
    </ContentWrapper>
  );
}
