import { PageLoading } from '@ant-design/pro-layout';
import Auth from '@/services/simple-abp/identity/auth';

Auth.userManager.signinRedirect();

const Login: React.FC = () => {
  return <PageLoading />;
};

export default Login;
