import { request } from 'umi';

import { IdentityClaimTypeDto } from '@/services/identity-server/dtos/IdentityClaimTypeDto'

export default {

getList: async ( options?: { [key: string]: any }) => {
  return request<[IdentityClaimTypeDto]>(`api/identity-server/claim-types`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
