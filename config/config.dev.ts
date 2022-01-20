// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    API_URL: 'https://localhost:7232',
    OIDC_CONFIG: {
      authority: 'https://localhost:7232',
      client_id: 'Ka_App',
      redirect_uri: 'http://localhost:3000/user/login-callback',
      response_type: 'code',
      scope: 'offline_access openid profile role email phone ka_api',
    },
  },
});
