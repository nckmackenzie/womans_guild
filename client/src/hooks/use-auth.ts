import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/lib/auth';

export const useAuth = ({ middleware }: { middleware: 'guest' | 'auth' }) => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) return; // Wait until loading is complete

    if (middleware === 'guest' && user) {
      navigate('/dashboard', { replace: true });
    } else if (middleware === 'auth' && error) {
      navigate('/login', { replace: true });
    }
  }, [error, navigate, user, middleware, isLoading]);

  // useEffect(() => {
  //   if (middleware === 'guest' && user) navigate('/dashboard');

  //   if (middleware === 'auth' && error) {
  //     navigate('/login');
  //   }
  // }, [error, navigate, user, middleware]);

  return { user, isLoading };
};
