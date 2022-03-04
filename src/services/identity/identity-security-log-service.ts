import { request } from 'umi';

import { GetIdentitySecurityLogListInput } from '@/services/identity/dtos/GetIdentitySecurityLogListInput';

import { IdentitySecurityLogPagedResultDto } from '@/services/identity/dtos/IdentitySecurityLogPagedResultDto';

export default {
  getList: async (input: GetIdentitySecurityLogListInput, options?: { [key: string]: any }) => {
    return request<IdentitySecurityLogPagedResultDto>(`api/identity/security-logs`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },
};
