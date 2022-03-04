import { request } from 'umi';

import { CommentWithDetailsListResultDto } from '@/services/cms-kit/dtos/CommentWithDetailsListResultDto'

import { CommentWithDetailsDto } from '@/services/cms-kit/dtos/CommentWithDetailsDto'

import { CreateCommentInput } from '@/services/cms-kit/dtos/CreateCommentInput'

import { CommentDto } from '@/services/cms-kit/dtos/CommentDto'

import { CmsUserDto } from '@/services/cms-kit/dtos/CmsUserDto'

import { UpdateCommentInput } from '@/services/cms-kit/dtos/UpdateCommentInput'

export default {

getList: async (entityType:string,entityId:string, options?: { [key: string]: any }) => {
  return request<CommentWithDetailsListResultDto>(`api/cms-kit-public/comments/${entityType}/${entityId}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (entityType:string,entityId:string,input:CreateCommentInput, options?: { [key: string]: any }) => {
  return request<CommentDto>(`api/cms-kit-public/comments/${entityType}/${entityId}`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:UpdateCommentInput, options?: { [key: string]: any }) => {
  return request<CommentDto>(`api/cms-kit-public/comments/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-public/comments/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
