import { request } from 'umi';

export async function getAuditLogs(
  params: Simple.Abp.GetAuditLogInput,
  options?: { [key: string]: any },
) {
  return request<Simple.Abp.PagedResult<Simple.Abp.AuditLog>>(`/api/audit-logging/audit-logs`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getAuditLogById(id: string, options?: { [key: string]: any }) {
  return request<Simple.Abp.AuditLog>(`/api/audit-logging/audit-logs/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}
