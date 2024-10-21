import ContentWrapper from '@/components/layout/content-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BalancesForm from '@/features/closing-balances/components/balances-form';

export default function ClosingBalancesindex() {
  return (
    <ContentWrapper title="Closing Balances">
      <Card>
        <CardHeader>
          <CardTitle>Closing Balances</CardTitle>
          <CardDescription>
            Select financial year then system will calculate the balances. Click
            Confirm once verified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BalancesForm />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
