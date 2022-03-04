import { request } from 'umi';

import { GetPermissionListResultDto } from '@/services/permission-management/dtos/GetPermissionListResultDto';
import { UpdatePermissionsDto } from '@/services/permission-management/dtos/UpdatePermissionsDto';

export default {
  get: async (providerName: string, providerKey: string, options?: { [key: string]: any }) => {
    return request<GetPermissionListResultDto>(`api/permission-management/permissions`, {
      method: 'GET',
      params: { providerName, providerKey },
      ...(options || {}),
    });
  },

  update: async (
    providerName: string,
    providerKey: string,
    input: UpdatePermissionsDto,
    options?: { [key: string]: any },
  ) => {
    return request<any>(`api/permission-management/permissions`, {
      method: 'PUT',
      params: { providerName, providerKey },
      data: input,
      ...(options || {}),
    });
  },
};
