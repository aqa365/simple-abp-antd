export interface IdentityUserDto {
  extraProperties?: { [key: string]: {} };

  id?: any;

  tenantId?: string;

  userName?: string;

  email?: string;

  name?: string;

  surname?: string;

  emailConfirmed?: boolean;

  phoneNumber?: string;

  phoneNumberConfirmed?: boolean;

  twoFactorEnabled?: boolean;

  lockoutEnabled?: boolean;

  isLockedOut?: boolean;

  concurrencyStamp?: string;
}
