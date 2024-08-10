import { useTitle } from '@/hooks/use-title';
import LoginForm from '../components/login-form';

export default function LoginPage() {
  useTitle('Login');

  return <LoginForm />;
}
