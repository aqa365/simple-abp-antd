import { request } from 'umi';

import { BlogDto } from '@/services/cms-kit-admin/dtos/BlogDto'

import { BlogGetListInput } from '@/services/cms-kit-admin/dtos/BlogGetListInput'

import { BlogPagedResultDto } from '@/services/cms-kit-admin/dtos/BlogPagedResultDto'

import { CreateBlogDto } from '@/services/cms-kit-admin/dtos/CreateBlogDto'

import { UpdateBlogDto } from '@/services/cms-kit-admin/dtos/UpdateBlogDto'

export default {

get: async (id:string, options?: { [key: string]: any }) => {
  return request<BlogDto>(`api/cms-kit-admin/blogs/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

getList: async (input:BlogGetListInput, options?: { [key: string]: any }) => {
  return request<BlogPagedResultDto>(`api/cms-kit-admin/blogs`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

create: async (input:CreateBlogDto, options?: { [key: string]: any }) => {
  return request<BlogDto>(`api/cms-kit-admin/blogs`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateBlogDto, options?: { [key: string]: any }) => {
  return request<BlogDto>(`api/cms-kit-admin/blogs/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/blogs/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
