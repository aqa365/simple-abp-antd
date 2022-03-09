import { request } from 'umi';
import { ApplicationConfigurationDto } from '@/services/abp/dtos/ApplicationConfigurationDto';

export default {
  get: async (options?: { [key: string]: any }) => {
    return request<ApplicationConfigurationDto>(`api/abp/application-configuration`, {
      method: 'GET',
      ...(options || {}),
    });
  },
};
