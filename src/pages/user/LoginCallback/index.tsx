import { PageLoading } from '@ant-design/pro-layout';
import Auth from '@/services/simple-abp/identity/auth';

Auth.userManager
  .signinRedirectCallback()
  .then((identity) => {
    Auth.setAccessToken(identity.access_token);
    window.location.href = '/';
  })
  .catch(function (e) {
    console.log(e);
  });
const LoginCallback: React.FC = () => {
  return <PageLoading />;
};

export default LoginCallback;
