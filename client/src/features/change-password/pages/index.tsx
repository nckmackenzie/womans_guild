import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ForgotPasswordForm from '@/features/change-password/components/forgot-password-form';

export default function ForgotPasswordIndexPage() {
  return (
    <div className="h-full grid place-content-center">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your phone number and we will send you a reset password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
