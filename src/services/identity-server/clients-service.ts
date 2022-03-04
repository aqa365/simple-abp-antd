import { request } from 'umi';

import { GetClientListInput } from '@/services/identity-server/dtos/GetClientListInput'

import { ClientWithDetailsPagedResultDto } from '@/services/identity-server/dtos/ClientWithDetailsPagedResultDto'

import { ClientWithDetailsDto } from '@/services/identity-server/dtos/ClientWithDetailsDto'

import { ClientSecretDto } from '@/services/identity-server/dtos/ClientSecretDto'

import { ClientScopeDto } from '@/services/identity-server/dtos/ClientScopeDto'

import { ClientClaimDto } from '@/services/identity-server/dtos/ClientClaimDto'

import { ClientGrantTypeDto } from '@/services/identity-server/dtos/ClientGrantTypeDto'

import { ClientIdentityProviderRestrictionDto } from '@/services/identity-server/dtos/ClientIdentityProviderRestrictionDto'

import { ClientPropertyDto } from '@/services/identity-server/dtos/ClientPropertyDto'

import { ClientCorsOriginDto } from '@/services/identity-server/dtos/ClientCorsOriginDto'

import { ClientRedirectUriDto } from '@/services/identity-server/dtos/ClientRedirectUriDto'

import { ClientPostLogoutRedirectUriDto } from '@/services/identity-server/dtos/ClientPostLogoutRedirectUriDto'

import { CreateClientDto } from '@/services/identity-server/dtos/CreateClientDto'

import { UpdateClientDto } from '@/services/identity-server/dtos/UpdateClientDto'

export default {

getList: async (input:GetClientListInput, options?: { [key: string]: any }) => {
  return request<ClientWithDetailsPagedResultDto>(`api/identity-server/clients`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<ClientWithDetailsDto>(`api/identity-server/clients/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:CreateClientDto, options?: { [key: string]: any }) => {
  return request<ClientWithDetailsDto>(`api/identity-server/clients`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateClientDto, options?: { [key: string]: any }) => {
  return request<ClientWithDetailsDto>(`api/identity-server/clients/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/identity-server/clients`, {
    method: 'DELETE',
    
    
        data:id,
        
    ...(options || {}),
  });
},

}
