import ContentWrapper from '@/components/layout/content-wrapper';
import UsersBox from '../components/users-box';

import { useTitle } from '@/hooks/use-title';

export default function UsersPage() {
  useTitle('Users');
  return (
    <ContentWrapper title="Users">
      <UsersBox />
    </ContentWrapper>
  );
}
