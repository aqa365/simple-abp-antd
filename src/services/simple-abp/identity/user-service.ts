import { request } from 'umi';
import { stringify } from 'qs';

export async function createUser(body: Identity.IdentityUser, options?: { [key: string]: any }) {
  return request<Identity.IdentityUser>('/api/identity/users', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateUser(
  params: {
    id: string;
  },
  body: Identity.IdentityUser,
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<Identity.IdentityUser>(`/api/identity/users/${param0}`, {
    method: 'PUT',
    //params: { ...params },
    data: body,
    ...(options || {}),
  });
}

export async function deleteUser(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<any>(`/api/identity/users/${param0}`, {
    method: 'DELETE',
    //params: { ...params },
    ...(options || {}),
  });
}

export async function getUsers(params: Simple.Abp.PageRequest, options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.IdentityUser>>(
    `/api/identity/users?${stringify(params)}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function getUserById(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<Identity.IdentityUser>(`/api/identity/users/${param0}`, {
    method: 'GET',
    //params: { ...params },
    ...(options || {}),
  });
}

export async function getUserByName(
  params: {
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0 } = params;
  return request<Identity.IdentityUser>(`/api/identity/users/by-username/${param0}`, {
    method: 'GET',
    //params: { ...params },
    ...(options || {}),
  });
}

export async function getUserRoles(id: string, options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(`/api/identity/users/${id}/roles`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getUserOrganizationUnits(id: string, options?: { [key: string]: any }) {
  return request<Identity.OrganizationUnit[]>(`/api/identity/users/${id}/organization-units`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAssignableRoles(options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(
    `/api/identity/users/assignable-roles`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
export async function getAvailableOrganizationUnits(options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/users/available-organization-units`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
