namespace Simple.Abp {
  type PageRequest = {
    filter?: string;
    sorting?: string;
    pageIndex?: number;
    pageSize?: number;
  };

  type PagedResult<T> = {
    items: T[];
    totalCount: number;
  };

  type Localization = {
    values: { [key: string]: string };
    languages: {
      cultureName: string;
      uiCultureName: string;
      displayName: string;
      flagIcon: string;
    }[];
    currentCulture: {
      displayName: string;
      englishName: string;
      threeLetterIsoLanguageName: string;
      twoLetterIsoLanguageName: string;
      isRightToLeft: boolean;
      cultureName: string;
      name: string;
      nativeName: string;
      dateTimeFormat: {
        calendarAlgorithmType: string;
        dateTimeFormatLong: string;
        shortDatePattern: string;
        fullDateTimePattern: string;
        dateSeparator: string;
        shortTimePattern: string;
        longTimePattern: string;
      };
      defaultResourceName: string;
      languagesMap: { [key: string]: string };
      languageFilesMap: { [key: string]: string };
    };
  };
  type Auth = {
    policies: { [key: string]: string };
    grantedPolicies: { [key: string]: string };
  };
  type Setting = {
    values: { [key: string]: string };
  };
  type CurrentUser = {
    isAuthenticated: true;
    id: string;
    tenantId: string;
    userName: string;
    name: string;
    surName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    phoneNumberVerified: boolean;
    roles: string[];
  };
  type Features = {
    values: { [key: string]: string };
  };
  type MultiTenancy = {
    isEnabled: boolean;
  };
  type CurrentTenant = {
    id: string;
    name: string;
    isAvailable: boolean;
  };
  type Timing = {};
  type Clock = {};
  type ObjectExtensions = {
    modules: {};
    enums: {};
  };

  type ApplicationConfiguration = {
    localization: Localization;
    auth: Auth;
    setting: Setting;
    currentUser: CurrentUser;
    features: Features;
    multiTenancy: MultiTenancy;
    currentTenant: CurrentTenant;
    timing: Timing;
    clock: Clock;
    objectExtensions: ObjectExtensions;
  };
}
