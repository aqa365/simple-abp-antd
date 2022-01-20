import { request } from 'umi';

export default {
  async getApplicationConfiguration(options?: { [key: string]: any }) {
    return request<Simple.Abp.ApplicationConfiguration>('/api/abp/application-configuration', {
      method: 'GET',
      ...(options || {}),
    });
  },
};
