import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function YearsPage() {
  return (
    <ContentWrapper title="Financial Years">
      <div>
        <CreateNewButton href="/admin/years/new">
          <Calendar className="mr-2 size-4" />
          <span>Create New Year</span>
        </CreateNewButton>
      </div>
    </ContentWrapper>
  );
}
