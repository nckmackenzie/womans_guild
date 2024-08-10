import ContentWrapper from '@/components/layout/content-wrapper';
import { useAuth } from '@/hooks/use-auth';
import { useTitle } from '@/hooks/use-title';

export default function Dashboard() {
  useTitle('Dashboard');
  const { isLoading } = useAuth({ middleware: 'auth' });
  if (isLoading) {
    <p>Loading...</p>;
  }
  return <ContentWrapper title="Dashboard">Dashboard</ContentWrapper>;
}
