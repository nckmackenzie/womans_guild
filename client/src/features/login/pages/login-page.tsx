// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/login-form';

import { useTitle } from '@/hooks/use-title';
import { useAuth } from '@/hooks/use-auth';
import { PageLoader } from '@/components/ui/loader';

export default function LoginPage() {
  useTitle('Login');
  // const navigate = useNavigate();
  const { isLoading } = useAuth({ middleware: 'auth' });

  if (isLoading) return <PageLoader />;

  // useEffect(
  //   function () {
  //     if (user) {
  //       navigate('/dashboard');
  //     }
  //   },
  //   [user, navigate]
  // );

  return <LoginForm />;
}
