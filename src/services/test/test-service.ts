import { request } from 'umi';

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<string>(`api/test`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
