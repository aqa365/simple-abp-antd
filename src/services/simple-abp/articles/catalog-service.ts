import { request } from 'umi';

export async function getCatalogs(
  params: Simple.Abp.PageRequest,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Articles.Catalog>>(`/api/articles/catalog`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getCatalogAll(options?: { [key: string]: any }) {
  return request<Articles.Catalog[]>(`/api/articles/catalog/all`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getCatalog(id: string, options?: { [key: string]: any }) {
  return request<Articles.Catalog>(`/api/articles/catalog/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createCatalog(body: Articles.Catalog, options?: { [key: string]: any }) {
  return request<Articles.Catalog>('/api/articles/catalog', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateCatalog(
  id: string,
  body: Articles.Catalog,
  options?: { [key: string]: any },
) {
  return request<Articles.Catalog>(`/api/identity/roles/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function deleteCatalog(id: string, options?: { [key: string]: any }) {
  return request<any>(`/api/identity/roles/${id}`, {
    method: 'DELETE',
    //params: { ...params },
    ...(options || {}),
  });
}
