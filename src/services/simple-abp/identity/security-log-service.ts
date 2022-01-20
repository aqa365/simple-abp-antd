import { request } from 'umi';
export async function getSecurityLogs(
  params: Identity.GetSecurityLogListInput,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Identity.SecurityLog>>(`/api/identity/security-logs`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
