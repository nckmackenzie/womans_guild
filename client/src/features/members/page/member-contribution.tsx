import ContentWrapper from '@/components/layout/content-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MemberContributionForm from '@/features/members/components/member-contribution-form';

export default function MemberContribution() {
  return (
    <ContentWrapper title="Member Contribution">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Set Member Contribution</CardTitle>
          <CardDescription>
            Define the amount each member should contribute for a specific year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberContributionForm />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
