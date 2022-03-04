import { request } from 'umi';

import { GetApiResourceListInput } from '@/services/identity-server/dtos/GetApiResourceListInput'

import { ApiResourceWithDetailsPagedResultDto } from '@/services/identity-server/dtos/ApiResourceWithDetailsPagedResultDto'

import { ApiResourceWithDetailsDto } from '@/services/identity-server/dtos/ApiResourceWithDetailsDto'

import { ApiResourceClaimDto } from '@/services/identity-server/dtos/ApiResourceClaimDto'

import { ApiResourceScopeDto } from '@/services/identity-server/dtos/ApiResourceScopeDto'

import { ApiResourceSecretDto } from '@/services/identity-server/dtos/ApiResourceSecretDto'

import { CreateApiResourceDto } from '@/services/identity-server/dtos/CreateApiResourceDto'

import { UpdateApiResourceDto } from '@/services/identity-server/dtos/UpdateApiResourceDto'

export default {

getList: async (input:GetApiResourceListInput, options?: { [key: string]: any }) => {
  return request<ApiResourceWithDetailsPagedResultDto>(`api/identity-server/api-resources`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

getAllList: async ( options?: { [key: string]: any }) => {
  return request<[ApiResourceWithDetailsDto]>(`api/identity-server/api-resources/all`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<ApiResourceWithDetailsDto>(`api/identity-server/api-resources/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:CreateApiResourceDto, options?: { [key: string]: any }) => {
  return request<ApiResourceWithDetailsDto>(`api/identity-server/api-resources`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateApiResourceDto, options?: { [key: string]: any }) => {
  return request<ApiResourceWithDetailsDto>(`api/identity-server/api-resources/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/identity-server/api-resources`, {
    method: 'DELETE',
    
    
        data:id,
        
    ...(options || {}),
  });
},

}
