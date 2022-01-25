import { request } from 'umi';
export async function getTags(params: Simple.Abp.PageRequest, options?: { [key: string]: any }) {
  return request<Simple.Abp.PagedResult<Articles.Tag>>(`/api/articles/tag`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
