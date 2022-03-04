import { request } from 'umi';

import { CreateBlogPostDto } from '@/services/cms-kit-admin/dtos/CreateBlogPostDto'

import { BlogPostDto } from '@/services/cms-kit-admin/dtos/BlogPostDto'

import { BlogPostGetListInput } from '@/services/cms-kit-admin/dtos/BlogPostGetListInput'

import { BlogPostListPagedResultDto } from '@/services/cms-kit-admin/dtos/BlogPostListPagedResultDto'

import { BlogPostListDto } from '@/services/cms-kit-admin/dtos/BlogPostListDto'

import { UpdateBlogPostDto } from '@/services/cms-kit-admin/dtos/UpdateBlogPostDto'

export default {

create: async (input:CreateBlogPostDto, options?: { [key: string]: any }) => {
  return request<BlogPostDto>(`api/cms-kit-admin/blogs/blog-posts`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/blogs/blog-posts/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<BlogPostDto>(`api/cms-kit-admin/blogs/blog-posts/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

getList: async (input:BlogPostGetListInput, options?: { [key: string]: any }) => {
  return request<BlogPostListPagedResultDto>(`api/cms-kit-admin/blogs/blog-posts`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateBlogPostDto, options?: { [key: string]: any }) => {
  return request<BlogPostDto>(`api/cms-kit-admin/blogs/blog-posts/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
