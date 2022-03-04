import { request } from 'umi';

import { IdentitySettingsDto } from '@/services/identity/dtos/IdentitySettingsDto'

import { IdentityPasswordSettingsDto } from '@/services/identity/dtos/IdentityPasswordSettingsDto'

import { IdentityLockoutSettingsDto } from '@/services/identity/dtos/IdentityLockoutSettingsDto'

import { IdentitySignInSettingsDto } from '@/services/identity/dtos/IdentitySignInSettingsDto'

import { IdentityUserSettingsDto } from '@/services/identity/dtos/IdentityUserSettingsDto'

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<IdentitySettingsDto>(`api/identity/settings`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

update: async (input:IdentitySettingsDto, options?: { [key: string]: any }) => {
  return request<any>(`api/identity/settings`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
