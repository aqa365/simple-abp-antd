import { request } from 'umi';

import { PageDto } from '@/services/cms-kit-admin/dtos/PageDto'

import { GetPagesInputDto } from '@/services/cms-kit-admin/dtos/GetPagesInputDto'

import { PagePagedResultDto } from '@/services/cms-kit-admin/dtos/PagePagedResultDto'

import { CreatePageInputDto } from '@/services/cms-kit-admin/dtos/CreatePageInputDto'

import { UpdatePageInputDto } from '@/services/cms-kit-admin/dtos/UpdatePageInputDto'

export default {

get: async (id:string, options?: { [key: string]: any }) => {
  return request<PageDto>(`api/cms-kit-admin/pages/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

getList: async (input:GetPagesInputDto, options?: { [key: string]: any }) => {
  return request<PagePagedResultDto>(`api/cms-kit-admin/pages`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

create: async (input:CreatePageInputDto, options?: { [key: string]: any }) => {
  return request<PageDto>(`api/cms-kit-admin/pages`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdatePageInputDto, options?: { [key: string]: any }) => {
  return request<PageDto>(`api/cms-kit-admin/pages/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/pages/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
