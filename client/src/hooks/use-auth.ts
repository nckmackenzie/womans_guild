import { getUser } from '@/lib/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  });

  useEffect(() => {
    if (middleware === 'guest' && user) navigate('/dashboard');

    if (middleware === 'auth' && error) {
      navigate('/');
    }
  }, [error, navigate, user, middleware]);

  return { user, isLoading };
};
