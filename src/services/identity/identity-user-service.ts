import { request } from 'umi';
import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto';
import { GetIdentityUsersInput } from '@/services/identity/dtos/GetIdentityUsersInput';
import { IdentityUserPagedResultDto } from '@/services/identity/dtos/IdentityUserPagedResultDto';
import { IdentityRoleListResultDto } from '@/services/identity/dtos/IdentityRoleListResultDto';
import { OrganizationUnitWithDetailsListResultDto } from '@/services/identity/dtos/OrganizationUnitWithDetailsListResultDto';
import { IdentityUserCreateDto } from '@/services/identity/dtos/IdentityUserCreateDto';
import { IdentityUserUpdateDto } from '@/services/identity/dtos/IdentityUserUpdateDto';
import { IdentityUserClaimDto } from '@/services/identity/dtos/IdentityUserClaimDto';
import { OrganizationUnitDto } from '@/services/identity/dtos/OrganizationUnitDto';
import { IdentityUserUpdateRolesDto } from '@/services/identity/dtos/IdentityUserUpdateRolesDto';
import { IdentityUserUpdatePasswordInput } from '@/services/identity/dtos/IdentityUserUpdatePasswordInput';

export default {
  get: async (id: string, options?: { [key: string]: any }) => {
    return request<IdentityUserDto>(`api/identity/users/${id}`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  getList: async (input: GetIdentityUsersInput, options?: { [key: string]: any }) => {
    return request<IdentityUserPagedResultDto>(`api/identity/users`, {
      method: 'GET',
      params: { ...input },
      ...(options || {}),
    });
  },

  getAssignableRoles: async (options?: { [key: string]: any }) => {
    return request<IdentityRoleListResultDto>(`api/identity/users/assignable-roles`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  getAvailableOrganizationUnits: async (options?: { [key: string]: any }) => {
    return request<OrganizationUnitWithDetailsListResultDto>(
      `api/identity/users/available-organization-units`,
      {
        method: 'GET',
        ...(options || {}),
      },
    );
  },

  create: async (input: IdentityUserCreateDto, options?: { [key: string]: any }) => {
    return request<IdentityUserDto>(`api/identity/users`, {
      method: 'POST',
      data: input,
      ...(options || {}),
    });
  },

  update: async (id: string, input: IdentityUserUpdateDto, options?: { [key: string]: any }) => {
    return request<IdentityUserDto>(`api/identity/users/${id}`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },

  delete: async (id: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/users/${id}`, {
      method: 'DELETE',
      ...(options || {}),
    });
  },

  getRoles: async (id: string, options?: { [key: string]: any }) => {
    return request<IdentityRoleListResultDto>(`api/identity/users/${id}/roles`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  getClaims: async (id: string, options?: { [key: string]: any }) => {
    return request<[IdentityUserClaimDto]>(`api/identity/users/${id}/claims`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  getOrganizationUnits: async (id: string, options?: { [key: string]: any }) => {
    return request<[OrganizationUnitDto]>(`api/identity/users/${id}/organization-units`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  updateRoles: async (
    id: string,
    input: IdentityUserUpdateRolesDto,
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/users/${id}/roles`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },

  updateClaims: async (
    id: string,
    input: [IdentityUserClaimDto],
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/users/${id}/claims`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },

  unlock: async (id: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/users/${id}/unlock`, {
      method: 'PUT',
      ...(options || {}),
    });
  },

  findByUsername: async (username: string, options?: { [key: string]: any }) => {
    return request<IdentityUserDto>(`api/identity/users/by-username/${username}`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  findByEmail: async (email: string, options?: { [key: string]: any }) => {
    return request<IdentityUserDto>(`api/identity/users/by-email/${email}`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  updatePassword: async (
    id: string,
    input: IdentityUserUpdatePasswordInput,
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/users/${id}/change-password`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },
};
