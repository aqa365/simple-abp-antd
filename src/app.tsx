import { history } from 'umi';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import Auth from '@/services/identity/auth';
import simpleLanguage from './utils/simple-language';

import { ApplicationConfigurationDto } from '@/services/abp/dtos/ApplicationConfigurationDto';
import abpApplicationService from '@/services/abp/abp-application-configuration-service';
import simpleAbp from './utils/simple-abp';

const loginPath = '/user/login';
const loginCorrelationPaths = [loginPath, '/user/login-callback'];
const notAuthPaths = [...loginCorrelationPaths,'/venom/aim'];

const currentPathExistByArr = (arr: string[]) => {
  const pathName = history.location.pathname;
  var result = false;

  for(const i in arr){
    const url = arr[i];
    result = pathName.indexOf(url) >= 0;
    if (result) break;
  }

  return result;
};

/** 获取用户信息 */
const getAppInfo = async () => {
  try {
    const applicationConfiguration = await abpApplicationService.get();
    return applicationConfiguration;
  } catch (error) {
    Auth.removeToken();
  }
  return null;
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
  appInfo?: ApplicationConfigurationDto | null | undefined;
  loading?: boolean;
  getAppInfo?: () => Promise<ApplicationConfigurationDto | null | undefined>;
}> {
  const appInfo = await getAppInfo();

  if (!appInfo) {
    history.push(loginPath);
    return {
      getAppInfo,
    };
  }

  // 未登录 在不需要登录的界面
  if (!appInfo.currentUser?.isAuthenticated && currentPathExistByArr(notAuthPaths)) {
    return {
      getAppInfo,
    };
  }

  // 未登录
  if (!appInfo.currentUser?.isAuthenticated) {

    history.push(loginPath);
    return {
      getAppInfo,
    };
  }

  // 已登录 在登录界面
  if (appInfo.currentUser.isAuthenticated && currentPathExistByArr(loginCorrelationPaths)) {
    history.push('/');
  }

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils(appInfo);
  const setting = simpleAbpUtils.setting;
  return {
    appInfo,
    getAppInfo,
    settings: {
      title: 'Simple Abp Pro',
      navTheme: setting.getAntdThemeSettingValue('PageStyle'),
      primaryColor: setting.getAntdThemeSettingValue('Color'),
      layout: setting.getAntdThemeSettingValue('SlidMenuLayout'),
      contentWidth: 'Fluid',
      fixedHeader: true,
      fixSiderbar: true,
      headerHeight: 48,
      splitMenus: false,
      colorWeak: false,
      iconfontUrl: '',
    },
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.appInfo?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      if (
        !currentPathExistByArr(notAuthPaths) &&
        !initialState?.appInfo?.currentUser?.isAuthenticated
      ) {
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
    url: `${API_URL}/${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
};
