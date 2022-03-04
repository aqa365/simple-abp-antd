import { request } from 'umi';

import { TagCreateDto } from '@/services/cms-kit-admin/dtos/TagCreateDto'

import { TagDto } from '@/services/cms-kit/dtos/TagDto'

import { TagGetListInput } from '@/services/cms-kit-admin/dtos/TagGetListInput'

import { TagPagedResultDto } from '@/services/cms-kit-admin/dtos/TagPagedResultDto'

import { TagUpdateDto } from '@/services/cms-kit-admin/dtos/TagUpdateDto'

import { TagDefinitionDto } from '@/services/cms-kit-admin/dtos/TagDefinitionDto'

export default {

create: async (input:TagCreateDto, options?: { [key: string]: any }) => {
  return request<TagDto>(`api/cms-kit-admin/tags`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/tags/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<TagDto>(`api/cms-kit-admin/tags/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

getList: async (input:TagGetListInput, options?: { [key: string]: any }) => {
  return request<TagPagedResultDto>(`api/cms-kit-admin/tags`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

update: async (id:string,input:TagUpdateDto, options?: { [key: string]: any }) => {
  return request<TagDto>(`api/cms-kit-admin/tags/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

getTagDefinitions: async ( options?: { [key: string]: any }) => {
  return request<[TagDefinitionDto]>(`api/cms-kit-admin/tags/tag-definitions`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
