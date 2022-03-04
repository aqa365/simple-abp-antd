import { request } from 'umi';

import { CreateUpdateRatingInput } from '@/services/cms-kit/dtos/CreateUpdateRatingInput'

import { RatingDto } from '@/services/cms-kit/dtos/RatingDto'

import { RatingWithStarCountDto } from '@/services/cms-kit/dtos/RatingWithStarCountDto'

export default {

create: async (entityType:string,entityId:string,input:CreateUpdateRatingInput, options?: { [key: string]: any }) => {
  return request<RatingDto>(`api/cms-kit-public/ratings/${entityType}/${entityId}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (entityType:string,entityId:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-public/ratings/${entityType}/${entityId}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

getGroupedStarCounts: async (entityType:string,entityId:string, options?: { [key: string]: any }) => {
  return request<[RatingWithStarCountDto]>(`api/cms-kit-public/ratings/${entityType}/${entityId}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
