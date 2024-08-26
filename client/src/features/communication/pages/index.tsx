import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SendMessageForm from '@/features/communication/components/send-message-form';
import { useMembers } from '@/features/members/hooks/use-members';
import { useTitle } from '@/hooks/use-title';

export default function CommunicationPage() {
  useTitle('Communication');
  const { error, isLoadingMembers, members } = useMembers();
  return (
    <ContentWrapper title="Communication">
      {error && <ErrorComponent error={error.message} />}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Communication</CardTitle>
          <CardDescription>
            Communice with members. Select members you want to send a message to
            and type your message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SendMessageForm isLoading={isLoadingMembers} members={members} />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
