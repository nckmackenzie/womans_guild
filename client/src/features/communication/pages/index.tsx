import ContentWrapper from '@/components/layout/content-wrapper';
import { ErrorComponent } from '@/components/ui/basic-alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SendMessageForm from '@/features/communication/components/send-message-form';
import MemberBalances from '@/features/communication/components/member-balances';

import { useMembers } from '@/features/members/hooks/use-members';
import { useActiveYears } from '@/features/years/hooks/use-active-years';
import { useTitle } from '@/hooks/use-title';

export default function CommunicationPage() {
  useTitle('Communication');

  return (
    <ContentWrapper title="Communication">
      <Tabs defaultValue="general" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General Communication</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralCommunication />
        </TabsContent>
        <TabsContent value="balances">
          <Balances />
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
}

function GeneralCommunication() {
  const { error, isLoadingMembers, members } = useMembers();
  return (
    <div className="space-y-4">
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
    </div>
  );
}

export function Balances() {
  const { activeYears, isLoadingYears, yearsError } = useActiveYears();

  return (
    <div className="space-y-4">
      {yearsError && <ErrorComponent error={yearsError.message} />}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Balances</CardTitle>
          <CardDescription>
            Send members their balances via a text message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberBalances isLoadingYears={isLoadingYears} years={activeYears} />
        </CardContent>
      </Card>
    </div>
  );
}
