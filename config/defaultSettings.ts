import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  primaryColor: '#2F54EB',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  pwa: false,
  logo: '/logo.png',
  headerHeight: 48,
  splitMenus: false,
  colorWeak: false,
  title: 'Simple Abp Pro',
  iconfontUrl: '',
};

export default Settings;
