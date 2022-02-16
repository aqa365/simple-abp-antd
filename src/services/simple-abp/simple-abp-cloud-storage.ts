import { request } from 'umi';

export async function uploads(formData: FormData, options?: { [key: string]: any }) {
  return request<string>('/api/cloud-storage/upload', {
    method: 'POST',
    body: formData,
    ...(options || {}),
  });
}
