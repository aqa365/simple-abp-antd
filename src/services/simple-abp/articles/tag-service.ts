import { request } from 'umi';

export async function getTags(params: Simple.Abp.PageRequest, options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Articles.Tag>>(`/api/articles/tag`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getTagAll(options?: { [key: string]: any }) {
  return request<Articles.Tag[]>(`/api/articles/tag/all`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createTag(body: Articles.Tag, options?: { [key: string]: any }) {
  return request<Articles.Tag>('/api/articles/tag', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateTag(id: string, body: Articles.Tag, options?: { [key: string]: any }) {
  return request<Articles.Tag>(`/api/articles/tag/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function deleteTag(id: string, options?: { [key: string]: any }) {
  return request<any>(`/api/articles/tag/${id}`, {
    method: 'DELETE',
    //params: { ...params },
    ...(options || {}),
  });
}
