import { request } from 'umi';

import { TagDto } from '@/services/cms-kit/dtos/TagDto'

export default {

getAllRelatedTags: async (entityType:string,entityId:string, options?: { [key: string]: any }) => {
  return request<[TagDto]>(`api/cms-kit-public/tags/${entityType}/${entityId}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
