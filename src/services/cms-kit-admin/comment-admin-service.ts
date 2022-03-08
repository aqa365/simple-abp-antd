import { request } from 'umi';
import { CommentGetListInput } from '@/services/cms-kit-admin/dtos/CommentGetListInput';
import { CommentWithAuthorPagedResultDto } from '@/services/cms-kit-admin/dtos/CommentWithAuthorPagedResultDto';
import { CommentWithAuthorDto } from '@/services/cms-kit-admin/dtos/CommentWithAuthorDto';

export default {
  getList: async (input: CommentGetListInput, options?: { [key: string]: any }) => {
    return request<CommentWithAuthorPagedResultDto>(`api/cms-kit-admin/comments`, {
      method: 'GET',
      params: { ...input },
      ...(options || {}),
    });
  },

  get: async (id: string, options?: { [key: string]: any }) => {
    return request<CommentWithAuthorDto>(`api/cms-kit-admin/comments/${id}`, {
      method: 'GET',
      ...(options || {}),
    });
  },

  delete: async (id: string, options?: { [key: string]: any }) => {
    return request<any>(`api/cms-kit-admin/comments/${id}`, {
      method: 'DELETE',
      ...(options || {}),
    });
  },
};
