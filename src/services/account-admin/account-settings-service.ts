import { request } from 'umi';

import { AccountSettingsDto } from '@/services/account-admin/dtos/AccountSettingsDto'

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<AccountSettingsDto>(`api/account-admin/settings`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

update: async (input:AccountSettingsDto, options?: { [key: string]: any }) => {
  return request<any>(`api/account-admin/settings`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
