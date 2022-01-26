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

export async function getArticle(id: string, options?: { [key: string]: any }) {
  return request<Articles.Article>(`/api/articles/article/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createArticle(body: Articles.Article, options?: { [key: string]: any }) {
  return request<Articles.Article>('/api/articles/article', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateArticle(
  id: string,
  body: Articles.Article,
  options?: { [key: string]: any },
) {
  return request<Articles.Article>(`/api/articles/article/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function deleteArticle(id: string, options?: { [key: string]: any }) {
  return request<any>(`/api/articles/article/${id}`, {
    method: 'DELETE',
    //params: { ...params },
    ...(options || {}),
  });
}
