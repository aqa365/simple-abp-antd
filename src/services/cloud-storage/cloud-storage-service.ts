import { request } from 'umi';
export default {
  postFile: async (file: FormData, options?: { [key: string]: any }) => {
    return request<string>(`api/cloud-storage/upload`, {
      method: 'POST',
      data: file,
      ...(options || {}),
    });
  },
};
