import { useModel } from 'umi';

class SimpleAbpUtils implements Utils.ISimpleAbpUtils {
  auth: Utils.IAuth;
  localization: Utils.ILocalization;
  currentUser: Utils.ICurrentUser;

  constructor(appInfo?: Simple.Abp.ApplicationConfiguration | null | undefined) {
    if (!appInfo) {
      appInfo = useModel('@@initialState').initialState?.appInfo;
    }

    this.auth = new Auth(appInfo);
    this.localization = new Localization(appInfo);
    this.currentUser = new CurrentUser(appInfo);
  }
}

class Auth implements Utils.IAuth {
  private _appInfo: Simple.Abp.ApplicationConfiguration | null | undefined;

  constructor(appInfo: Simple.Abp.ApplicationConfiguration | null | undefined) {
    this._appInfo = appInfo;
  }

  checkGrant(action: (checkResults: boolean[]) => boolean, ...policyNames: any[]) {
    const policies = this._appInfo?.auth.policies;
    const grantedPolicies = this._appInfo?.auth.grantedPolicies;

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
  private _appInfo: Simple.Abp.ApplicationConfiguration | null | undefined;

  constructor(appInfo: Simple.Abp.ApplicationConfiguration | null | undefined) {
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

    var source = this._appInfo?.localization.values[sourceName];
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
  private _appInfo: Simple.Abp.ApplicationConfiguration | null | undefined;

  constructor(appInfo: Simple.Abp.ApplicationConfiguration | null | undefined) {
    this._appInfo = appInfo;
  }

  getWaterMark() {
    const currentUser = this._appInfo?.currentUser;
    const waterMark = currentUser?.emailVerified ? currentUser?.email : currentUser?.userName;
    return waterMark || '';
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
