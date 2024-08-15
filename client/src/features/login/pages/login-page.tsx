import { useTitle } from '@/hooks/use-title';
import LoginForm from '../components/login-form';

export default function LoginPage() {
  useTitle('Login');
  // const navigate = useNavigate();
  // const { user } = useAuth({ middleware: 'auth' });

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
