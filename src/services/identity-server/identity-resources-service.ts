import { request } from 'umi';

import { GetIdentityResourceListInput } from '@/services/identity-server/dtos/GetIdentityResourceListInput'

import { IdentityResourceWithDetailsPagedResultDto } from '@/services/identity-server/dtos/IdentityResourceWithDetailsPagedResultDto'

import { IdentityResourceWithDetailsDto } from '@/services/identity-server/dtos/IdentityResourceWithDetailsDto'

import { IdentityResourceClaimDto } from '@/services/identity-server/dtos/IdentityResourceClaimDto'

import { CreateIdentityResourceDto } from '@/services/identity-server/dtos/CreateIdentityResourceDto'

import { UpdateIdentityResourceDto } from '@/services/identity-server/dtos/UpdateIdentityResourceDto'

export default {

getList: async (input:GetIdentityResourceListInput, options?: { [key: string]: any }) => {
  return request<IdentityResourceWithDetailsPagedResultDto>(`api/identity-server/identity-resources`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

getAllList: async ( options?: { [key: string]: any }) => {
  return request<[IdentityResourceWithDetailsDto]>(`api/identity-server/identity-resources/all`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<IdentityResourceWithDetailsDto>(`api/identity-server/identity-resources/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:CreateIdentityResourceDto, options?: { [key: string]: any }) => {
  return request<IdentityResourceWithDetailsDto>(`api/identity-server/identity-resources`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateIdentityResourceDto, options?: { [key: string]: any }) => {
  return request<IdentityResourceWithDetailsDto>(`api/identity-server/identity-resources/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/identity-server/identity-resources`, {
    method: 'DELETE',
    
    
        data:id,
        
    ...(options || {}),
  });
},

createStandardResources: async ( options?: { [key: string]: any }) => {
  return request<any>(`api/identity-server/identity-resources/create-standard-resources`, {
    method: 'POST',
    
    
    ...(options || {}),
  });
},

}
