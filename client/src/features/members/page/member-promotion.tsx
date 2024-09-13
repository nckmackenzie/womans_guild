import ContentWrapper from '@/components/layout/content-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PromotionForm from '../components/promotion-form';

export default function MemberPromotion() {
  return (
    <ContentWrapper title="Member Promotion">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Member Promotion</CardTitle>
          <CardDescription>
            Select members you want to promote and select promotion date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PromotionForm />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
