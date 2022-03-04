import { request } from 'umi';

import { BlogPostPublicDto } from '@/services/cms-kit/dtos/BlogPostPublicDto'

import { CmsUserDto } from '@/services/cms-kit/dtos/CmsUserDto'

import { PagedAndSortedResultRequestDto } from '@/services/cms-kit/dtos/PagedAndSortedResultRequestDto'

import { BlogPostPublicPagedResultDto } from '@/services/cms-kit/dtos/BlogPostPublicPagedResultDto'

export default {

get: async (blogSlug:string,blogPostSlug:string, options?: { [key: string]: any }) => {
  return request<BlogPostPublicDto>(`api/cms-kit-public/blog-posts/${blogSlug}/${blogPostSlug}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

getList: async (blogSlug:string,input:PagedAndSortedResultRequestDto, options?: { [key: string]: any }) => {
  return request<BlogPostPublicPagedResultDto>(`api/cms-kit-public/blog-posts/${blogSlug}`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

}
