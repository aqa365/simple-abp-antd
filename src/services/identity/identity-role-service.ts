import { request } from 'umi';

import { IdentityRoleDto } from '@/services/identity/dtos/IdentityRoleDto';

import { IdentityRoleCreateDto } from '@/services/identity/dtos/IdentityRoleCreateDto';

import { IdentityRoleUpdateDto } from '@/services/identity/dtos/IdentityRoleUpdateDto';

import { IdentityRoleListResultDto } from '@/services/identity/dtos/IdentityRoleListResultDto';

import { GetIdentityRoleListInput } from '@/services/identity/dtos/GetIdentityRoleListInput';

import { IdentityRolePagedResultDto } from '@/services/identity/dtos/IdentityRolePagedResultDto';

import { IdentityRoleClaimDto } from '@/services/identity/dtos/IdentityRoleClaimDto';

export default {
  get: async (id: string, options?: { [key: string]: any }) => {
    return request<IdentityRoleDto>(`api/identity/roles/${id}`, {
      method: 'GET',

      ...(options || {}),
    });
  },

  create: async (input: IdentityRoleCreateDto, options?: { [key: string]: any }) => {
    return request<IdentityRoleDto>(`api/identity/roles`, {
      method: 'POST',

      data: input,

      ...(options || {}),
    });
  },

  update: async (id: string, input: IdentityRoleUpdateDto, options?: { [key: string]: any }) => {
    return request<IdentityRoleDto>(`api/identity/roles/${id}`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },

  delete: async (id: string, options?: { [key: string]: any }) => {
    return request<any>(`api/identity/roles/${id}`, {
      method: 'DELETE',

      ...(options || {}),
    });
  },

  getAllList: async (options?: { [key: string]: any }) => {
    return request<IdentityRoleListResultDto>(`api/identity/roles/all`, {
      method: 'GET',

      ...(options || {}),
    });
  },

  getList: async (input: GetIdentityRoleListInput, options?: { [key: string]: any }) => {
    return request<IdentityRolePagedResultDto>(`api/identity/roles`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  updateClaims: async (
    id: string,
    input: [IdentityRoleClaimDto],
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/identity/roles/${id}/claims`, {
      method: 'PUT',

      data: input,

      ...(options || {}),
    });
  },

  getClaims: async (id: string, options?: { [key: string]: any }) => {
    return request<[IdentityRoleClaimDto]>(`api/identity/roles/${id}/claims`, {
      method: 'GET',

      ...(options || {}),
    });
  },
};
