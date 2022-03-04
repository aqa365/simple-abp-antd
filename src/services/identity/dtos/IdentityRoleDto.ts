export interface IdentityRoleDto {
  extraProperties?: { [key: string]: {} };

  id?: any;

  name: string;

  isDefault?: boolean;

  isStatic?: boolean;

  isPublic?: boolean;

  concurrencyStamp?: string;
}
