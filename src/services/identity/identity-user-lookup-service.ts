import { request } from 'umi';

import { UserData } from '@/services/identity/dtos/UserData'

import { UserLookupSearchInputDto } from '@/services/identity/dtos/UserLookupSearchInputDto'

import { UserDataListResultDto } from '@/services/identity/dtos/UserDataListResultDto'

import { UserLookupCountInputDto } from '@/services/identity/dtos/UserLookupCountInputDto'

export default {

findById: async (id:string, options?: { [key: string]: any }) => {
  return request<UserData>(`api/identity/users/lookup/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

findByUserName: async (userName:string, options?: { [key: string]: any }) => {
  return request<UserData>(`api/identity/users/lookup/by-username/${userName}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

search: async (input:UserLookupSearchInputDto, options?: { [key: string]: any }) => {
  return request<UserDataListResultDto>(`api/identity/users/lookup/search`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

getCount: async (input:UserLookupCountInputDto, options?: { [key: string]: any }) => {
  return request<number>(`api/identity/users/lookup/count`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

}
