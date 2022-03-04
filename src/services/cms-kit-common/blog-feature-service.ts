import { request } from 'umi';

import { BlogFeatureDto } from '@/services/cms-kit-common/dtos/BlogFeatureDto'

export default {

getOrDefault: async (blogId:string,featureName:string, options?: { [key: string]: any }) => {
  return request<BlogFeatureDto>(`api/cms-kit/blogs/${blogId}/features/${featureName}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
