import { request } from 'umi';

import { MenuItemDto } from '@/services/cms-kit/dtos/MenuItemDto'

export default {

getList: async ( options?: { [key: string]: any }) => {
  return request<[MenuItemDto]>(`api/cms-kit-public/menu-items`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
