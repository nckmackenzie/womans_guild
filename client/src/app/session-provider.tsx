import { useAuth } from '@/hooks/use-auth';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface SessionProps {
  isLoading: boolean;
  user: { email: string };
}

const SessionContext = createContext<SessionProps | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, user } = useAuth({ middleware: 'auth' });
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return;
  }

  return (
    <SessionContext.Provider value={{ isLoading, user: user.user }}>
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error('useSession must be used within a SessionProvider');

  return context;
};
