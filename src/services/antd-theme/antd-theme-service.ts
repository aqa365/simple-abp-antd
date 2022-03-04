import { request } from 'umi';

import { AntdThemeSettingsDto } from '@/services/antd-theme/dtos/AntdThemeSettingsDto'

import { EnumAntdThemeStyle } from '@/services/antd-theme/dtos/EnumAntdThemeStyle'

import { EnumAntdThemeColor } from '@/services/antd-theme/dtos/EnumAntdThemeColor'

import { EnumAntdThemeMenuStyle } from '@/services/antd-theme/dtos/EnumAntdThemeMenuStyle'

import { EnumAntdThemeWidthStyle } from '@/services/antd-theme/dtos/EnumAntdThemeWidthStyle'

export default {

get: async ( options?: { [key: string]: any }) => {
  return request<AntdThemeSettingsDto>(`api/antd-theme/management`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

update: async (input:AntdThemeSettingsDto, options?: { [key: string]: any }) => {
  return request<any>(`api/antd-theme/management`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
