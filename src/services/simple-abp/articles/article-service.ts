import { request } from 'umi';
export async function getArticles(
  params: Articles.GetArticlesInput,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Articles.Article>>(`/api/articles/article`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
