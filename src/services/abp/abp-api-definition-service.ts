import { request } from 'umi';

import { ApplicationApiDescriptionModelRequestDto } from '@/services/abp/dtos/ApplicationApiDescriptionModelRequestDto'

import { ApplicationApiDescriptionModel } from '@/services/abp/dtos/ApplicationApiDescriptionModel'

export default {

get: async (model:ApplicationApiDescriptionModelRequestDto, options?: { [key: string]: any }) => {
  return request<ApplicationApiDescriptionModel>(`api/abp/api-definition`, {
    method: 'GET',
    
        params:{...model},
        
    
    ...(options || {}),
  });
},

}
