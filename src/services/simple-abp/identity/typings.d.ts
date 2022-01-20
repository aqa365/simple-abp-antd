/* eslint-disable */
declare namespace Identity {
  type IdentityUser = {
    extraProperties?: {};
    id: string;
    userName: string;
    name?: string;
    surname?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnabled: boolean;
    isLockedOut?: boolean;
    concurrencyStamp?: string;
    roleNames: string[];
    organizationUnitIds: string[];
  };

  type IdentityRole = {
    id: string;
    roleId?: string;
    name: string;
    isDefault: boolean;
    isStatic: boolean;
    isPublic: boolean;
    concurrencyStamp?: string;
    extraProperties?: {};
  };

  type PermissionItem = {
    name: string;
    displayName: string;
    parentName: string;
    isGranted: boolean;
    allowedProviders: string[];
    grantedProviders: {
      providerName: string;
      providerKey: string;
    }[];
  };

  type PermissionGroup = {
    name: string;
    displayName: string;
    permissions: PermissionItem[];
  };

  type Permission = {
    entityDisplayName: string;
    groups: PermissionGroup[];
  };

  type OrganizationUnit = {
    id: string;
    creationTime: string;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;
    isDeleted: boolean;
    deleterId: string;
    deletionTime: string;
    parentId?: string;
    code: string;
    displayName: string;
    concurrencyStamp?: string;
    roles: Identity.IdentityRole[];
    extraProperties: {};
  };

  type CreateOrUpdateOrganizationUnit = {
    id?: string;
    parentId?: string;
    newParentId?: string;
    displayName?: string;
    concurrencyStamp?: string;
    extraProperties?: {};
  };

  type GetSecurityLogListInput = {
    startDateTime?: string;
    endDateTime?: string;
    applicationName?: string;
    identity?: string;
    actionName?: string;
    userName?: string;
    clientId?: string;
    correlationId?: string;
  } & Simple.Abp.PageRequest;

  type SecurityLog = {
    applicationName: string;
    identity: string;
    action: string;
    userId: string;
    userName: string;
    tenantName: string;
    clientId: string;
    correlationId: string;
    clientIpAddress: string;
    browserInfo: string;
    creationTime: string;
    id: string;
    extraProperties: {};
  };
}
