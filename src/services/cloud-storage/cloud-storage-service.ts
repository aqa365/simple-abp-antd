import { request } from 'umi';

import { IFormFile } from '@/services/cloud-storage/dtos/IFormFile'

import { Uri } from '@/services/cloud-storage/dtos/Uri'

import { UriHostNameType } from '@/services/cloud-storage/dtos/UriHostNameType'

export default {

postFile: async (file:IFormFile, options?: { [key: string]: any }) => {
  return request<Uri>(`api/cloud-storage/upload`, {
    method: 'POST',
    
    
        data:file,
        
    ...(options || {}),
  });
},

}
