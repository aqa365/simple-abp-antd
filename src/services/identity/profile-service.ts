import { request } from 'umi';

import { ProfileDto } from '@/services/identity/dtos/ProfileDto'

import { UpdateProfileDto } from '@/services/identity/dtos/UpdateProfileDto'

import { ChangePasswordInput } from '@/services/identity/dtos/ChangePasswordInput'

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<ProfileDto>(`api/identity/my-profile`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

update: async (input:UpdateProfileDto, options?: { [key: string]: any }) => {
  return request<ProfileDto>(`api/identity/my-profile`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

changePassword: async (input:ChangePasswordInput, options?: { [key: string]: any }) => {
  return request<any>(`api/identity/my-profile/change-password`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
