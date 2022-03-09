declare namespace Utils {
  /** simple abp start */
  interface ISimpleAbpUtils {
    auth: IAuth;
    localization: ILocalization;
    currentUser: ICurrentUser;
  }

  interface IAuth {
    checkGrant(action: (checkResults: boolean[]) => boolean, ...policyNames: string[]): boolean;
    isGranted(...policyNames: string[]): boolean;
    isGrantedStrict(...policyNames: string[]): boolean;
  }

  interface ILocalization {
    getResource(sourceName: string): (key: string, ...params: string[]) => string;
    localize(key: string, sourceName: string, ...params: string[]): string;
  }

  interface ICurrentUser {
    getWaterMark(): string;
  }

  interface ISetting {
    getValue(name: string): string;
    getAntdThemeSettingValue(name: string): any;
  }
  /** simple abp end */
}
