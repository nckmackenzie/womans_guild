import { useTitle } from '@/hooks/use-title';
import LoginForm from '../components/login-form';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage() {
  useTitle('Login');
  const navigate = useNavigate();
  const { user } = useAuth({ middleware: 'auth' });

  useEffect(
    function () {
      if (user) {
        navigate('/dashboard');
      }
    },
    [user, navigate]
  );

  return <LoginForm />;
}
