import { request } from 'umi';

import { GetIdentityClaimTypesInput } from '@/services/identity/dtos/GetIdentityClaimTypesInput'

import { ClaimTypePagedResultDto } from '@/services/identity/dtos/ClaimTypePagedResultDto'

import { ClaimTypeDto } from '@/services/identity/dtos/ClaimTypeDto'

import { IdentityClaimValueType } from '@/services/identity/dtos/IdentityClaimValueType'

import { CreateClaimTypeDto } from '@/services/identity/dtos/CreateClaimTypeDto'

import { UpdateClaimTypeDto } from '@/services/identity/dtos/UpdateClaimTypeDto'

export default {

getList: async (input:GetIdentityClaimTypesInput, options?: { [key: string]: any }) => {
  return request<ClaimTypePagedResultDto>(`api/identity/claim-types`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

getAllList: async ( options?: { [key: string]: any }) => {
  return request<[ClaimTypeDto]>(`api/identity/claim-types/all`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<ClaimTypeDto>(`api/identity/claim-types/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:CreateClaimTypeDto, options?: { [key: string]: any }) => {
  return request<ClaimTypeDto>(`api/identity/claim-types`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateClaimTypeDto, options?: { [key: string]: any }) => {
  return request<ClaimTypeDto>(`api/identity/claim-types/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/identity/claim-types/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
