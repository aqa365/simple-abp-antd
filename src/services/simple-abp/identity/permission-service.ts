import { request } from 'umi';
export async function getPermissions(
  params: {
    providerName: string;
    providerKey: string;
  },
  options?: { [key: string]: any },
) {
  return request<Identity.Permission>(`/api/permission-management/permissions`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function setPermissions(
  params: {
    providerName: string;
    providerKey: string;
  },
  body: any,
  options?: { [key: string]: any },
) {
  return request<Identity.IdentityUser>(`/api/permission-management/permissions`, {
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
