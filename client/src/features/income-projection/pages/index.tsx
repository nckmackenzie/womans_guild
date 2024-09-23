import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import { useTitle } from '@/hooks/use-title';
import { ChartNoAxesCombined } from 'lucide-react';

export default function IncomeProjectionIndex() {
  useTitle('Income Projection');
  return (
    <ContentWrapper title="Income Projection">
      <CreateNewButton href="/transactions/income-projections/new">
        <ChartNoAxesCombined className="icon mr-2" />
        <span>Create New Projection</span>
      </CreateNewButton>
    </ContentWrapper>
  );
}
