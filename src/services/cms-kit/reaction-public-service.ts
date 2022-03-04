import { request } from 'umi';

import { ReactionWithSelectionListResultDto } from '@/services/cms-kit/dtos/ReactionWithSelectionListResultDto'

import { ReactionWithSelectionDto } from '@/services/cms-kit/dtos/ReactionWithSelectionDto'

export default {

getForSelection: async (entityType:string,entityId:string, options?: { [key: string]: any }) => {
  return request<ReactionWithSelectionListResultDto>(`api/cms-kit-public/reactions/${entityType}/${entityId}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (entityType:string,entityId:string,reaction:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-public/reactions/${entityType}/${entityId}/${reaction}`, {
    method: 'PUT',
    
    
    ...(options || {}),
  });
},

delete: async (entityType:string,entityId:string,reaction:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-public/reactions/${entityType}/${entityId}/${reaction}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
