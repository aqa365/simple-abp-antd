import { OrganizationUnitRoleDto } from '@/services/identity/dtos/OrganizationUnitRoleDto';

export interface OrganizationUnitDto {
  extraProperties?: { [key: string]: {} };

  id?: any;

  creationTime?: string;

  creatorId?: string;

  lastModificationTime?: string;

  lastModifierId?: string;

  isDeleted?: boolean;

  deleterId?: string;

  deletionTime?: string;

  parentId?: string;

  code?: string;

  displayName?: string;

  roles: [OrganizationUnitRoleDto];
}
