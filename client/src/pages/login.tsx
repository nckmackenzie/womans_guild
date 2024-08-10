import LoginForm from '@/features/login/components/login-form';
import { useTitle } from '@/hooks/use-title';

export default function LoginPage() {
  useTitle('Login');

  return <LoginForm />;
}
