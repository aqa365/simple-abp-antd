import { request } from 'umi';
import { AntdThemeSettingsDto } from '@/services/antd-theme/dtos/AntdThemeSettingsDto';

export default {
  get: async (options?: { [key: string]: any }) => {
    return request<AntdThemeSettingsDto>(`api/antd-theme/settings`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  update: async (input: AntdThemeSettingsDto, options?: { [key: string]: any }) => {
    return request<any>(`api/antd-theme/settings`, {
      method: 'PUT',
      data: input,
      ...(options || {}),
    });
  },
};
