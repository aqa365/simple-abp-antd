import { request } from 'umi';

import { PageDto } from '@/services/cms-kit/dtos/PageDto'

export default {

findBySlug: async (slug:string, options?: { [key: string]: any }) => {
  return request<PageDto>(`api/cms-kit-public/pages/${slug}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
