import { request } from 'umi';

import { CreateMediaInputWithStream } from '@/services/cms-kit-admin/dtos/CreateMediaInputWithStream'

import { MediaDescriptorDto } from '@/services/cms-kit-admin/dtos/MediaDescriptorDto'

import { IRemoteStreamContent } from '@/services/cms-kit-admin/dtos/IRemoteStreamContent'

export default {

create: async (entityType:string,inputStream:CreateMediaInputWithStream, options?: { [key: string]: any }) => {
  return request<MediaDescriptorDto>(`api/cms-kit-admin/media/${entityType}`, {
    method: 'POST',
    
    
        data:inputStream,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/media/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

}
