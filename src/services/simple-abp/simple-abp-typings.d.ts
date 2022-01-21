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

  type GetAuditLogInput = {
    startTime?: string;
    endTime?: string;
    url?: string;
    userName?: string;
    applicationName?: string;
    correlationId?: string;
    httpMethod?: string;
    httpStatusCode?: number;
    maxExecutionDuration?: number;
    minExecutionDuration?: number;
    hasException?: boolean;
  } & Simple.Abp.PageRequest;

  type AuditLog = {
    userId: string;
    userName: string;
    tenantId: string;
    impersonatorUserId: string;
    impersonatorTenantId: string;
    executionTime: string;
    executionDuration: number;
    clientIpAddress: string;
    clientName: string;
    browserInfo: string;
    httpMethod: number;
    url: string;
    exceptions: string;
    comments: string;
    httpStatusCode: number;
    applicationName: string;
    correlationId: string;
    entityChanges: EntityChange[];
    actions: AuditLogAction[];
    id: string;
    extraProperties: {};
  };

  type AuditLogAction = {
    id: string;
    tenantId: string;
    auditLogId: string;
    serviceName: string;
    methodName: string;
    parameters: string;
    executionTime: string;
    executionDuration: number;
    extraProperties: {};
  };

  type EntityChange = {
    extraProperties: {};
    id: string;
    auditLogId: string;
    tenantId: string;
    changeTime: string;
    changeType: number;
    entityId: string;
    entityTypeFullName: string;
    propertyChanges: EntityPropertyChange[];
  };

  type EntityPropertyChange = {
    id: string;
    tenantId: string;
    entityChangeId: string;
    newValue: string;
    originalValue: string;
    propertyName: string;
    propertyTypeFullName: string;
  };
}
