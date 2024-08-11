import ContentWrapper from '@/components/layout/content-wrapper';
import UserManagement from '../components/user-management';

export default function NewUser() {
  return (
    <ContentWrapper title="Create User">
      <UserManagement />
    </ContentWrapper>
  );
}
