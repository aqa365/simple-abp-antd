import { request } from 'umi';

import { GetApiScopeListInput } from '@/services/identity-server/dtos/GetApiScopeListInput'

import { ApiScopePagedResultDto } from '@/services/identity-server/dtos/ApiScopePagedResultDto'

import { ApiScopeDto } from '@/services/identity-server/dtos/ApiScopeDto'

import { ApiScopeClaimDto } from '@/services/identity-server/dtos/ApiScopeClaimDto'

import { CreateApiScopeDto } from '@/services/identity-server/dtos/CreateApiScopeDto'

import { UpdateApiScopeDto } from '@/services/identity-server/dtos/UpdateApiScopeDto'

export default {

getList: async (input:GetApiScopeListInput, options?: { [key: string]: any }) => {
  return request<ApiScopePagedResultDto>(`api/identity-server/api-scopes`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

getAllList: async ( options?: { [key: string]: any }) => {
  return request<[ApiScopeDto]>(`api/identity-server/api-scopes/all`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<ApiScopeDto>(`api/identity-server/api-scopes/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:CreateApiScopeDto, options?: { [key: string]: any }) => {
  return request<ApiScopeDto>(`api/identity-server/api-scopes`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateApiScopeDto, options?: { [key: string]: any }) => {
  return request<ApiScopeDto>(`api/identity-server/api-scopes/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/identity-server/api-scopes`, {
    method: 'DELETE',
    
    
        data:id,
        
    ...(options || {}),
  });
},

}
