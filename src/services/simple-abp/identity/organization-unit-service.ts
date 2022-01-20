import { request } from 'umi';
export async function getAllOrganizationUnits(options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/organization-units/all`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function createOrganizationUnit(
  data: Identity.CreateOrUpdateOrganizationUnit,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/organization-units`,
    {
      method: 'POST',
      data,
      ...(options || {}),
    },
  );
}

export async function updateOrganizationUnit(
  data: Identity.CreateOrUpdateOrganizationUnit,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/organization-units/${data.id}`,
    {
      method: 'PUT',
      data,
      ...(options || {}),
    },
  );
}

export async function moveOrganizationUnit(
  data: Identity.CreateOrUpdateOrganizationUnit,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/organization-units/${data.id}/move`,
    {
      method: 'PUT',
      data,
      ...(options || {}),
    },
  );
}

export async function deleteOrganizationUnit(id: string, options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Identity.OrganizationUnit>>(
    `/api/identity/organization-units`,
    {
      method: 'Delete',
      params: { id },
      ...(options || {}),
    },
  );
}

export async function getOrganizationUnitMembers(
  id: string,
  params: Simple.Abp.PageRequest,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityUser>>(
    `/api/identity/organization-units/${id}/members`,
    {
      params,
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function updateOrganizationUnitMembers(
  id: string,
  data: { userIds: string[] },
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityUser>>(
    `/api/identity/organization-units/${id}/members`,
    {
      method: 'PUT',
      data,
      ...(options || {}),
    },
  );
}

export async function deleteOrganizationUnitMember(
  id: string,
  memberId: string,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityUser>>(
    `/api/identity/organization-units/${id}/members/${memberId}`,
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}

export async function getOrganizationUnitRoles(
  id: string,
  params: Simple.Abp.PageRequest,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(
    `/api/identity/organization-units/${id}/roles`,
    {
      params,
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function updateOrganizationUnitRoles(
  id: string,
  data: { roleIds: string[] },
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityRole>>(
    `/api/identity/organization-units/${id}/roles`,
    {
      data,
      method: 'PUT',
      ...(options || {}),
    },
  );
}

export async function deleteOrganizationUnitRole(
  id: string,
  roleId: string,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.IdentityUser>>(
    `/api/identity/organization-units/${id}/roles/${roleId}`,
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}
