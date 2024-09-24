import ContentWrapper from '@/components/layout/content-wrapper';
import StatCards from '@/features/dashboard/components/stat-cards';

export default function DashboardPage() {
  return (
    <ContentWrapper title="Dashboard">
      <div className="space-y-6">
        <StatCards />
      </div>
    </ContentWrapper>
  );
}
