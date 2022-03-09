export interface AntdThemeSettingsDto {
  pageStyleSetting: {
    pageStyle: number;
  };
  themeColor: {
    color: number;
  };
  navigationMode: {
    slidMenuLayout: number;
    contentWidth: number;
    fixedHeader: boolean;
    fixedSidebar: boolean;
    splitMenus: boolean;
  };
  regionalSettings: {
    header: boolean;
    footer: boolean;
    menu: boolean;
    menuHeader: boolean;
  };
  otherSettings: {
    weakMode: boolean;
  };
}
