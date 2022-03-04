import { request } from 'umi';

import { EntityTagCreateDto } from '@/services/cms-kit-admin/dtos/EntityTagCreateDto'

import { EntityTagRemoveDto } from '@/services/cms-kit-admin/dtos/EntityTagRemoveDto'

import { EntityTagSetDto } from '@/services/cms-kit-admin/dtos/EntityTagSetDto'

export default {

addTagToEntity: async (input:EntityTagCreateDto, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/entity-tags`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

removeTagFromEntity: async (input:EntityTagRemoveDto, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/entity-tags`, {
    method: 'DELETE',
    
    
        data:input,
        
    ...(options || {}),
  });
},

setEntityTags: async (input:EntityTagSetDto, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/entity-tags`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
