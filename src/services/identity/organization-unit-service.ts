import { request } from 'umi';

import { OrganizationUnitRoleInput } from '@/services/identity/dtos/OrganizationUnitRoleInput';

import { OrganizationUnitUserInput } from '@/services/identity/dtos/OrganizationUnitUserInput';

import { OrganizationUnitCreateDto } from '@/services/identity/dtos/OrganizationUnitCreateDto';

import { OrganizationUnitWithDetailsDto } from '@/services/identity/dtos/OrganizationUnitWithDetailsDto';

import { GetOrganizationUnitInput } from '@/services/identity/dtos/GetOrganizationUnitInput';

import { OrganizationUnitWithDetailsPagedResultDto } from '@/services/identity/dtos/OrganizationUnitWithDetailsPagedResultDto';

import { OrganizationUnitWithDetailsListResultDto } from '@/services/identity/dtos/OrganizationUnitWithDetailsListResultDto';

import { PagedAndSortedResultRequestDto } from '@/services/cms-kit/dtos/PagedAndSortedResultRequestDto';

import { IdentityRolePagedResultDto } from '@/services/identity/dtos/IdentityRolePagedResultDto';

import { GetIdentityUsersInput } from '@/services/identity/dtos/GetIdentityUsersInput';

import { IdentityUserPagedResultDto } from '@/services/identity/dtos/IdentityUserPagedResultDto';

import { OrganizationUnitMoveInput } from '@/services/identity/dtos/OrganizationUnitMoveInput';

import { OrganizationUnitUpdateDto } from '@/services/identity/dtos/OrganizationUnitUpdateDto';

export default {
  addRoles: async (
    id: string,
    input: OrganizationUnitRoleInput,
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/organization-units/${id}/roles`, {
      method: 'PUT',

      data: input,

      ...(options || {}),
    });
  },

  addMembers: async (
    id: string,
    input: OrganizationUnitUserInput,
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/organization-units/${id}/members`, {
      method: 'PUT',

      data: input,

      ...(options || {}),
    });
  },

  create: async (input: OrganizationUnitCreateDto, options?: { [key: string]: any }) => {
    return request<OrganizationUnitWithDetailsDto>(`api/identity/organization-units`, {
      method: 'POST',

      data: input,

      ...(options || {}),
    });
  },

  delete: async (id: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/organization-units`, {
      method: 'DELETE',
      params: { id },
      ...(options || {}),
    });
  },

  get: async (id: string, options?: { [key: string]: any }) => {
    return request<OrganizationUnitWithDetailsDto>(`api/identity/organization-units/${id}`, {
      method: 'GET',

      ...(options || {}),
    });
  },

  getList: async (input: GetOrganizationUnitInput, options?: { [key: string]: any }) => {
    return request<OrganizationUnitWithDetailsPagedResultDto>(`api/identity/organization-units`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  getListAll: async (options?: { [key: string]: any }) => {
    return request<OrganizationUnitWithDetailsListResultDto>(
      `api/identity/organization-units/all`,
      {
        method: 'GET',

        ...(options || {}),
      },
    );
  },

  getRoles: async (
    id: string,
    input: PagedAndSortedResultRequestDto,
    options?: { [key: string]: any },
  ) => {
    return request<IdentityRolePagedResultDto>(`api/identity/organization-units/${id}/roles`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  getMembers: async (
    id: string,
    input: GetIdentityUsersInput,
    options?: { [key: string]: any },
  ) => {
    return request<IdentityUserPagedResultDto>(`api/identity/organization-units/${id}/members`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  move: async (id: string, input: OrganizationUnitMoveInput, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/organization-units/${id}/move`, {
      method: 'PUT',

      data: input,

      ...(options || {}),
    });
  },

  update: async (
    id: string,
    input: OrganizationUnitUpdateDto,
    options?: { [key: string]: any },
  ) => {
    return request<OrganizationUnitWithDetailsDto>(`api/identity/organization-units/${id}`, {
      method: 'PUT',

      data: input,

      ...(options || {}),
    });
  },

  removeMember: async (id: string, memberId: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/organization-units/${id}/members/${memberId}`, {
      method: 'DELETE',

      ...(options || {}),
    });
  },

  removeRole: async (id: string, roleId: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/organization-units/${id}/roles/${roleId}`, {
      method: 'DELETE',

      ...(options || {}),
    });
  },
};
