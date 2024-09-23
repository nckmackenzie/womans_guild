import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ResetPasswordForm from '@/features/reset-password/components/reset-password-form';

export default function ResetPasswordIndexPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="max-w-lg mx-4 sm:mx-auto w-full">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
