import ContentWrapper from '@/components/layout/content-wrapper';
import StatCards from '@/features/dashboard/components/stat-cards';
import { useTitle } from '@/hooks/use-title';

export default function DashboardPage() {
  useTitle('Dashboard');
  return (
    <ContentWrapper title="Dashboard">
      <div className="space-y-6">
        <StatCards />
      </div>
    </ContentWrapper>
  );
}
