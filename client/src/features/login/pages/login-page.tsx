import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/login-form';

import { useTitle } from '@/hooks/use-title';
import { useAuth } from '@/hooks/use-auth';

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
