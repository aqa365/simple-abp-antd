import { history } from 'umi';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import Auth from './services/simple-abp/identity/auth';
import SimpleAbpService from './services/simple-abp/simple-abp-service';
import simpleLanguage from './utils/simple-language';

const loginPath = '/user/login';
const loginCorrelationPaths = [loginPath, '/user/login-callback'];
const notAuthPaths = [...loginCorrelationPaths];

/** 获取用户信息 */
const getAppInfo = async () => {
  try {
    const applicationConfiguration = await SimpleAbpService.getApplicationConfiguration();
    return applicationConfiguration;
  } catch (error) {
    Auth.removeToken();
  }
  return undefined;
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  appInfo?: Simple.Abp.ApplicationConfiguration | null;
  loading?: boolean;
  getAppInfo?: () => Promise<Simple.Abp.ApplicationConfiguration | null | undefined>;
}> {
  const appInfo = await getAppInfo();

  if (!appInfo) {
    history.push(loginPath);
    return {
      getAppInfo,
    };
  }

  const pathName = history.location.pathname;

  // 未登录 在不需要登录的界面
  if (!appInfo.currentUser.isAuthenticated && notAuthPaths.indexOf(pathName) > -1) {
    return {
      getAppInfo,
    };
  }

  // 未登录
  if (!appInfo.currentUser.isAuthenticated) {
    history.push(loginPath);
    return {
      getAppInfo,
    };
  }

  // 已登录 在登录界面
  if (appInfo.currentUser.isAuthenticated && loginCorrelationPaths.indexOf(pathName) > -1) {
    history.push('/');
  }

  return {
    appInfo,
    getAppInfo,
    //settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.appInfo?.currentUser.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      if (
        notAuthPaths.indexOf(history.location.pathname) <= -1 &&
        !initialState?.appInfo?.currentUser.isAuthenticated
      ) {
        alert(initialState?.appInfo?.currentUser.userName);
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings || defaultSettings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = {};
  authHeader[API_ACCEPT_LANGUAGE_KEY] = simpleLanguage.getCurrentLanguage();
  authHeader[API_TOKEN_KEY] = `Bearer ${Auth.getAccessToken()}`;

  return {
    url: `${API_URL}${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
};
