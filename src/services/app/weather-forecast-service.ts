import { request } from 'umi';

import { WeatherForecast } from '@/services/app/dtos/WeatherForecast'

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<[WeatherForecast]>(`WeatherForecast`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

}
