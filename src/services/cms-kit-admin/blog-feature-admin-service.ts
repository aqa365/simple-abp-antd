import { request } from 'umi';

import { BlogFeatureDto } from '@/services/cms-kit-common/dtos/BlogFeatureDto'

import { BlogFeatureInputDto } from '@/services/cms-kit-admin/dtos/BlogFeatureInputDto'

export default {

getList: async (blogId:string, options?: { [key: string]: any }) => {
  return request<[BlogFeatureDto]>(`api/cms-kit-admin/blogs/${blogId}/features`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

set: async (blogId:string,dto:BlogFeatureInputDto, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/blogs/${blogId}/features`, {
    method: 'PUT',
    
    
        data:dto,
        
    ...(options || {}),
  });
},

}
