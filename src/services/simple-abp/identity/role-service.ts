import { request } from 'umi';

export async function createRole(body: Identity.IdentityRole, options?: { [key: string]: any }) {
  return request<Identity.IdentityRole>('/api/identity/roles', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateRole(
  params: {
    id: string;
  },
  body: Identity.IdentityRole,
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<Identity.IdentityRole>(`/api/identity/roles/${param0}`, {
    method: 'PUT',
    //params: { ...params },
    data: body,
    ...(options || {}),
  });
}

export async function deleteRole(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<any>(`/api/identity/roles/${param0}`, {
    method: 'DELETE',
    //params: { ...params },
    ...(options || {}),
  });
}

export async function getRoles(
  params: Simple.Abp.PageRequest,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(`/api/identity/roles`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getAllRoles(options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(`/api/identity/roles`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getRoleById(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<Identity.IdentityRole>(`/api/identity/roles/${param0}`, {
    method: 'GET',
    //params: { ...params },
    ...(options || {}),
  });
}
