import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/login-form';

import { useTitle } from '@/hooks/use-title';
import { useAuth } from '@/hooks/use-auth';
import { PageLoader } from '@/components/ui/loader';

export default function LoginPage() {
  useTitle('Login');
  const navigate = useNavigate();
  const { isLoading, user } = useAuth({ middleware: 'auth' });

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <PageLoader />;

  return <LoginForm />;
}
