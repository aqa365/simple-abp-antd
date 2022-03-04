import { request } from 'umi';

import { RemoteStreamContent } from '@/services/cms-kit-common/dtos/RemoteStreamContent'

export default {

download: async (id:string, options?: { [key: string]: any }) => {
  return request<RemoteStreamContent>(`api/cms-kit/media/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
