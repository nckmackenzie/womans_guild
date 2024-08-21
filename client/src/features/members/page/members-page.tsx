import { User } from 'lucide-react';

import ContentWrapper from '@/components/layout/content-wrapper';
import { CreateNewButton } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Search from '@/components/ui/search';
import MembersTable, {
  MembersTableSkeleton,
} from '@/features/members/components/members-table';
import { ErrorComponent } from '@/components/ui/basic-alert';

import { usePageFetch } from '@/hooks/use-page-fetch';
import { fetchMembers } from '@/features/members/api';

export default function MembersPage() {
  const { data, error, isLoading } = usePageFetch('members', fetchMembers);
  return (
    <ContentWrapper title="Members">
      <div className="space-y-4">
        <CreateNewButton href="/transactions/members/new">
          <User className="size-4 mr-2" />
          <span>Create Member</span>
        </CreateNewButton>
        {error && <ErrorComponent error={error.message} />}
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>
              A list of all created Womans Guild Members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Search placeholder="Search by member name or contact" />
            {isLoading && <MembersTableSkeleton />}
            {!isLoading && data?.data && <MembersTable data={data.data} />}
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
}
