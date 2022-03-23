import { PageLoading } from '@ant-design/pro-layout';
import Auth from '@/services/identity/auth';

Auth.userManager.signinRedirect();
const Login: React.FC = () => {
  return <PageLoading />;
};

export default Login;
