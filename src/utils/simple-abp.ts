import { useModel } from 'umi';
import { ApplicationConfigurationDto } from '@/services/abp/dtos/ApplicationConfigurationDto';
class SimpleAbpUtils implements Utils.ISimpleAbpUtils {
  auth: Utils.IAuth;
  localization: Utils.ILocalization;
  currentUser: Utils.ICurrentUser;
  setting: Utils.ISetting;

  constructor(appInfo?: ApplicationConfigurationDto | null | undefined) {
    if (!appInfo) {
      appInfo = useModel('@@initialState').initialState?.appInfo;
    }

    this.auth = new Auth(appInfo);
    this.localization = new Localization(appInfo);
    this.currentUser = new CurrentUser(appInfo);
    this.setting = new Setting(appInfo);
  }
}

class Auth implements Utils.IAuth {
  private _appInfo: ApplicationConfigurationDto | null | undefined;

  constructor(appInfo: ApplicationConfigurationDto | null | undefined) {
    this._appInfo = appInfo;
  }

  checkGrant(action: (checkResults: boolean[]) => boolean, ...policyNames: any[]) {
    const policies = this._appInfo?.auth?.policies;
    const grantedPolicies = this._appInfo?.auth?.grantedPolicies;

    if (!(policies && grantedPolicies)) {
      return false;
    }

    const checkResults = [];
    for (const index in arguments) {
      const policyName = arguments[index];
      const grant = policies[policyName] !== undefined && grantedPolicies[policyName] !== undefined;
      checkResults.push(grant);
    }

    return action(checkResults);
  }

  isGranted = (...policyNames: string[]) => {
    return this.checkGrant((checkResults) => {
      return checkResults.filter((c) => c).length > 0;
    }, ...policyNames);
  };

  isGrantedStrict = (...policyNames: string[]) => {
    return this.checkGrant((checkResults) => {
      return checkResults.filter((c) => !c).length <= 0;
    }, ...policyNames);
  };
}

class Localization implements Utils.ILocalization {
  private _appInfo: ApplicationConfigurationDto | null | undefined;

  constructor(appInfo: ApplicationConfigurationDto | null | undefined) {
    this._appInfo = appInfo;
  }

  getResource(sourceName: string) {
    return (key: string, ...params: string[]) => {
      return this.localize(key, sourceName, ...params);
    };
  }

  localize(key: string, sourceName: string, ...params: string[]) {
    if (sourceName === '_') {
      //A convention to suppress the localization
      return key;
    }

    if (!sourceName) {
      console.warn(
        'Localization source name is not specified and the defaultResourceName was not defined!',
      );
      return key;
    }

    var source = this._appInfo?.localization?.values[sourceName];
    if (!source) {
      console.warn('Could not find localization source: ' + sourceName);
      return key;
    }

    var value = source[key];
    if (value == undefined) {
      console.warn('Value is undefined . key:' + key);
      return key;
    }

    return utils.formatString(value, ...params);
  }
}

class CurrentUser implements Utils.ICurrentUser {
  private _appInfo: ApplicationConfigurationDto | null | undefined;

  constructor(appInfo: ApplicationConfigurationDto | null | undefined) {
    this._appInfo = appInfo;
  }

  getWaterMark() {
    const currentUser = this._appInfo?.currentUser;
    const waterMark = currentUser?.emailVerified ? currentUser?.email : currentUser?.userName;
    return waterMark || '';
  }
}

class Setting implements Utils.ISetting {
  private _appInfo: ApplicationConfigurationDto | null | undefined;
  private _antdThemeValueDic: { [key: string]: { [key: string]: string } };
  constructor(appInfo: ApplicationConfigurationDto | null | undefined) {
    this._appInfo = appInfo;
    this._antdThemeValueDic = {
      'Abp.AntdTheme.PageStyle': {
        '1': 'light',
        '2': 'dark',
        '3': 'realDark',
      },
    };
  }
  getValue(name: string): string {
    return this._appInfo?.setting?.values[name] || '';
  }
  getAntdThemeSettingValue(name: string): any {
    var value = this.getValue(name);

    switch (name) {
      case 'Abp.AntdTheme.PageStyle':
      case 'Abp.AntdTheme.Color':
      case 'Abp.AntdTheme.ContentWidth':
      case 'Abp.AntdTheme.SlidMenuLayout':
        return this._antdThemeValueDic[name][value];

      case 'Abp.AntdTheme.FixedHeader':
      case 'Abp.AntdTheme.FixedSidebar':
      case 'Abp.AntdTheme.Footer':
      case 'Abp.AntdTheme.Header':
      case 'Abp.AntdTheme.Menu':
      case 'Abp.AntdTheme.MenuHeader':
      case 'Abp.AntdTheme.SplitMenus':
      case 'Abp.AntdTheme.WeakMode':
        return value === 'True';
    }

    return value;
  }
}
const utils = {
  replaceAll(str: string, search: string, replacement: string) {
    var fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(fix, 'g'), replacement);
  },

  formatString(str: string, ...params: string[]) {
    for (var i = 1; i < arguments.length; i++) {
      var placeHolder = '{' + (i - 1) + '}';
      str = this.replaceAll(str, placeHolder, arguments[i]);
    }

    return str;
  },
};

export default {
  SimpleAbpUtils,
  utils,
};
